import { Menu as AntdMenu } from "antd";
import React, { RefObject } from "react";
import { TUiDataMenuCustomProps } from "./TUiDataMenuProps";

const UiDataMenu = React.forwardRef(
  (props: TUiDataMenuCustomProps, ref: RefObject<any>) => {
    const filteredProps = { ...props };

    delete filteredProps.dataSource;
    delete filteredProps.className;

    delete filteredProps.onSelectMenu;
    delete filteredProps.selected;
    return (
      <AntdMenu ref={ref} {...filteredProps} style={{ borderRight: 0 }}>
        {props.dataSource.map((item) => {
          if (!item.hidden) {
            if (!item.children) {
              return (
                <AntdMenu.Item
                  key={item.url ? item.url : item.id}
                  icon={item.icon}
                  disabled={item.disabled}
                  onClick={() => props?.onSelectMenu(item)}
                >
                  {item.title}
                </AntdMenu.Item>
              );
            } else {
              return (
                <AntdMenu.SubMenu
                  key={item.id ? item.id : item.url}
                  icon={item.icon}
                  disabled={item.disabled}
                  onTitleClick={() => props?.onSelectMenu(item)}
                  title={item.title}
                >
                  {item?.children?.map((subItem) => {
                    if (!subItem.hidden) {
                      return (
                        <AntdMenu.Item
                          key={subItem.id ? subItem.id : subItem.url}
                          icon={subItem.icon}
                          disabled={subItem.disabled}
                          onClick={() =>
                            props?.onSelectMenu({
                              ...subItem,
                              icon: subItem?.icon || item.icon,
                            })
                          }
                        >
                          {subItem.title}
                        </AntdMenu.Item>
                      );
                    }
                  })}
                </AntdMenu.SubMenu>
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
