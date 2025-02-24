interface IStyleSwitchCase {
    variant: string;
    cases: Record<string, string>;
}

/**
 * A utility function that returns a style based on the provided variant from a cases object
 * @param variant - The variant key to match against
 * @param cases - An object mapping variant keys to style values
 * @returns The matched style string or undefined if no match is found
 */

export const StyleSwitchCase = ({ variant, cases }: IStyleSwitchCase): string | undefined => {
    return cases[variant];
}