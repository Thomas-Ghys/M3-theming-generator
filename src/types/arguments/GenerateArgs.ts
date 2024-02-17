import { ColorArg } from "../colors/ColorArg";
import { EMPTY_PATH_ARGS, PathArgs } from "../paths/PathArg";

export type GenerateArgs = {
    node: string,
    index: string,
    command: string,
    path: PathArgs,
    colors: ColorArg[]
};

export const EMPTY_GENERATE_ARGS: GenerateArgs = {
    node: '',
    index: '',
    command: '',
    path: EMPTY_PATH_ARGS,
    colors: []
}