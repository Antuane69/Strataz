import { Input } from "antd";
import { useEffect, useRef } from "react";
import type { InputFormularioInterface } from "@/interfaces";

export default function InputFormulario({ value, onCommit, rows, className, placeholder, resetKey }: InputFormularioInterface) {
  const normalizedValue = value ?? '';
  const inputKey = resetKey ?? 'draft-text-input';
  const onCommitRef = useRef(onCommit);
  const localValueRef = useRef(normalizedValue);
  const committedValueRef = useRef(normalizedValue);
  const commitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    onCommitRef.current = onCommit;
  }, [onCommit]);

  useEffect(() => {
    localValueRef.current = normalizedValue;
    committedValueRef.current = normalizedValue;

    if (commitTimerRef.current) {
      window.clearTimeout(commitTimerRef.current);
      commitTimerRef.current = null;
    }
  }, [inputKey, normalizedValue]);

  useEffect(() => {
    return () => {
      if (commitTimerRef.current) {
        window.clearTimeout(commitTimerRef.current);
      }
    };
  }, []);

  const clearCommitTimer = () => {
    if (commitTimerRef.current) {
      window.clearTimeout(commitTimerRef.current);
      commitTimerRef.current = null;
    }
  };

  const commitNow = () => {
    clearCommitTimer();

    if (localValueRef.current !== committedValueRef.current) {
      committedValueRef.current = localValueRef.current;
      onCommitRef.current(localValueRef.current);
    }
  };

  const queueCommit = (nextValue: string) => {
    localValueRef.current = nextValue;
    clearCommitTimer();
    commitTimerRef.current = window.setTimeout(commitNow, 350);
  };

  if (rows) {
    return (
      <Input.TextArea
        key={inputKey}
        rows={rows}
        className={className}
        placeholder={placeholder}
        defaultValue={normalizedValue}
        onChange={(event) => queueCommit(event.target.value)}
        onBlur={commitNow}
      />
    );
  }

  return (
    <Input
      key={inputKey}
      className={className}
      placeholder={placeholder}
      defaultValue={normalizedValue}
      onChange={(event) => queueCommit(event.target.value)}
      onBlur={commitNow}
    />
  );
}
