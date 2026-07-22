import { TranslateFn } from "@/i18n/translation-core";

export function withTranslatedFields<
    Raw extends { slug: string },
    Fields extends Record<string, unknown>
>(
    raw: Raw,
    namespace: string,
    translate: TranslateFn,
    buildFields: (scopedTranslate: TranslateFn) => Fields
): Raw & Fields {
    const scopedTranslate: TranslateFn = (key: string, options) => {
        const cleanKey = key.startsWith(".") ? key.slice(1) : key;
        return translate(`${namespace}.${raw.slug}.${cleanKey}`, options);
    };

    return {
        ...raw,
        ...buildFields(scopedTranslate),
    };
}

export function withTranslatedList<
    Raw extends { slug: string },
    Fields extends Record<string, unknown>
>(
    rawList: Raw[],
    namespace: string,
    translate: TranslateFn,
    buildFields: (scopedTranslate: TranslateFn) => Fields
): (Raw & Fields)[] {
    return rawList.map((raw) =>
        withTranslatedFields(raw, namespace, translate, buildFields)
    );
}