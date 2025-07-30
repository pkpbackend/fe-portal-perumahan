import React, { RefObject } from "react";
import { Menu as AntdMenu } from "antd";
import { TUiDataMenuProps } from "./TUiDataMenuProps";
import styles from "./DataMenu.module.scss";

const { SubMenu } = AntdMenu;

const UiDataMenu = React.forwardRef(
  (props: TUiDataMenuProps, ref: RefObject<any>) => {
    const filteredProps = { ...props };
    delete filteredProps.dataSource;
    delete filteredProps.className;

    return (
      <AntdMenu
        ref={ref}
        {...filteredProps}
        onSelect={(e) => props.onSelect(e)}
        className={styles[props?.className]}
        id={props?.className || ""}
      >
        {props.dataSource.map((item) => {
          if (!item.hidden) {
            if (!item.children) {
              return (
                <AntdMenu.Item
                  key={item.url ? item.url : item.id}
                  icon={item.icon}
                  disabled={item.disabled}
                  className={styles["menu"]}
                >
                  {item.title}
                </AntdMenu.Item>
              );
            } else {
              return (
                <SubMenu
                  key={item.url ? item.url : item.id}
                  title={item.title}
                  icon={item.icon}
                  disabled={item.disabled}
                  className={styles["parent-child-menu"]}
                >
                  {item.children?.map((subItem) => {
                    if (!subItem.hidden) {
                      return (
                        <AntdMenu.Item
                          key={subItem.url ? subItem.url : subItem.id}
                          icon={subItem.icon}
                          disabled={subItem.disabled}
                        >
                          <div>{subItem.title}</div>
                        </AntdMenu.Item>
                      );
                    }
                  })}
                </SubMenu>
              );
            }
          }
        })}
      </AntdMenu>
    );
  }
);

UiDataMenu.defaultProps = {
  dataSource: [],
  // horizontal, vertical, inline
  mode: "horizontal",
  // light, dark
  theme: "light",
  // default keys
  defaultOpenKeys: [],
  defaultSelectedKeys: [],
};

export default UiDataMenu;
