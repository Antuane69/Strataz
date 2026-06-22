export interface InputFormularioInterface {
  value?: string | null;
  onCommit: (value: string) => void;
  rows?: number;
  className?: string;
  placeholder?: string;
  resetKey?: string;
}