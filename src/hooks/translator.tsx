import { FC, createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "./language";
import { Translator } from "../lib/translator";
import { Requests } from "../lib/requests";
import { getStorageItem, setStorageItem } from "../lib/storage";

// Create Translator Instance
export const TRANSLATOR = new Translator({
  defaultLanguage: "en",
  currentLangauge: "en",
  engine: async (language, targetStrings) => {
    // Send Request
    const Response = await new Requests().post<{
      targetLanguage: string;
      translated: Record<string, string>;
    }>(
      "translator/translate/",
      { targetStrings },
      {
        headers: {
          "Accept-Language": language.current,
        },
      }
    );

    if (Response.status) {
      return Response.data.translated;
    } else throw new Error(Response.messages[0].message);
  },
});

// Create Context
const SetTranslationContext = createContext(
  (null as unknown) as <T extends string | string[]>(
    targets: T
  ) => Promise<string | string[]>
);

export const useTranslator = () => useContext(SetTranslationContext);

export interface TranslationProviderProps {
  children: React.ReactNode;
}

export enum TranslationProviderStates {
  READY,
  WORKING,
}

export const TranslationProvider: FC<TranslationProviderProps> = ({
  children,
}) => {
  // Get Application Current Language
  const [language] = useLanguage();

  // Translation Targets Setter Function
  const SetTranslation = async (targets: string | string[]) => {
    const Results = await Promise.all(
      (targets instanceof Array ? targets : [targets]).map(async (target) => {
        await new Promise<void>((resolve) => {
          const Timer = setInterval(() => {
            if (TRANSLATOR.metadata.state === TranslationProviderStates.READY) {
              clearInterval(Timer);
              resolve();
            }
          });
        });

        // Push Translation Targets
        TRANSLATOR.setTranslations((translations) => [
          ...translations,
          ...[target],
        ]);

        return await new Promise<string>((resolve) => {
          if (TRANSLATOR.metadata.translations instanceof Array)
            TRANSLATOR.metadata.translations.push({
              key: target,
              value: resolve,
            });
          else
            TRANSLATOR.metadata.translations = [
              {
                key: target,
                value: resolve,
              },
            ];
        });
      })
    );

    return targets instanceof Array ? Results : Results[0];
  };

  useEffect(() => {
    clearInterval(TRANSLATOR.metadata.timer);

    // Set Initial State
    TRANSLATOR.metadata.state = TranslationProviderStates.READY;

    TRANSLATOR.metadata.timer = setInterval(async () => {
      if (TRANSLATOR.metadata.state === TranslationProviderStates.READY) {
        // Update State
        TRANSLATOR.metadata.state = TranslationProviderStates.WORKING;

        // Translate Data
        await TRANSLATOR.setOptions({
          currentLangauge: language,
        })
          .setCacheEngines(setStorageItem, getStorageItem)
          .translate<string[]>();

        // Get Translated Data
        const Translated = TRANSLATOR.getTranslated();

        // Resolve Translations
        (TRANSLATOR.metadata.translations || []).forEach(
          (item: { key: string; value: Function }) => {
            // Get Result
            const Result = Translated[item.key] || item.key;

            // Resolve Translation
            if (typeof item.value === "function") item.value(Result);
          }
        );

        // Reset
        TRANSLATOR.setTranslations([]);
        TRANSLATOR.metadata.state = TranslationProviderStates.READY;
      }
    }, 300);
  }, [language]);

  return (
    <SetTranslationContext.Provider value={SetTranslation}>
      {children}
    </SetTranslationContext.Provider>
  );
};

export interface TranslateProps<T extends string | string[]> {
  string: T;
  params?: T extends string ? (string | number)[] : (string | number)[][];
  template?: (t: T) => JSX.Element;
}

// Process Result
export const Interpolated = <T extends string | string[]>(
  target: T,
  params: T extends string ? (string | number)[] : (string | number)[][]
) => {
  if (params instanceof Array)
    params.forEach((param, paramIndex) => {
      if (
        typeof target === "string" &&
        ["string", "number"].includes(typeof param)
      )
        target = target.replace(
          new RegExp(`<${paramIndex}>`, "g"),
          param.toString()
        ) as T;
      else if (target instanceof Array && param instanceof Array)
        target = target.map((item, itemIndex) =>
          paramIndex === itemIndex
            ? (Interpolated(item, param) as string)
            : item
        ) as T;
    });

  return target;
};

export const Translate = <T extends string | string[]>({
  string,
  params,
  template,
}: TranslateProps<T>) => {
  // Get Application Current Language
  const [language] = useLanguage();

  const [translated, setTranslated] = useState(string);

  // Create Translator
  const Translate = useTranslator();

  useEffect(() => {
    const Mounted = { current: true };

    if (string)
      (async () => {
        // Check Provider
        if (typeof Translate !== "function")
          throw new Error(`You might forgot to add the Translation provider!`);

        // Translate the Target
        const Translated = (await Translate(string)) as T;

        if (Mounted.current) setTranslated(Translated);
      })();

    return () => {
      Mounted.current = false;
    };
  }, [language, string]);

  // Return Translated Component
  if (typeof template === "function")
    return template(Interpolated(translated, params || []));
  else return <>{Interpolated(translated, params || [])}</>;
};
