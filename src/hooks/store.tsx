import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TypeDispatch, TypeRootState } from "../store";

export const useAppDispatch = () => useDispatch<TypeDispatch>();
export const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector;
