import React, { useRef, useEffect } from "react";
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from "react-select";

import { useField } from "@unform/core";

import { Container } from "./styles";

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

const InputSearch: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      // path: "value",
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return "";
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <ReactSelect
        ref={selectRef}
        defaultValue={defaultValue}
        classNamePrefix="react-select"
        {...rest}
      />
    </Container>
  );
};

export default InputSearch;
