import { Input as AntdInput } from "antd";
import React, { RefObject, useState } from "react";

import { TextAreaProps } from "antd/lib/input";
import { TextAreaRef } from "antd/lib/input/TextArea";

export default React.forwardRef(
  (
    props: TextAreaProps & {
      ref: RefObject<TextAreaRef>;
    },
    ref: RefObject<TextAreaRef>
  ) => {
    const stylePassive = { backgroundColor: "#fff" };
    const styleActive = { backgroundColor: "#e6f7ff" };

    const [style, setStyle] = useState(stylePassive);

    const newProps = {
      ...props,
      style: {
        ...props.style,
        ...style,
      },
    };

    return (
      <AntdInput.TextArea
        ref={ref}
        {...newProps}
        onFocus={(event) => {
          setStyle({
            ...props.style,
            ...styleActive,
          });

          if (props.onFocus) props.onFocus(event);
        }}
        onBlur={(event) => {
          setStyle({
            ...props.style,
            ...stylePassive,
          });

          if (props.onBlur) props.onBlur(event);
        }}
      />
    );
  }
);
