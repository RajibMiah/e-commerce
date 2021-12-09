import React, {useState, useEffect} from "react";
import {usePrevious, useMeasure} from "utils/hooks";
import {useSpring, animated} from "react-spring";
import {Frame, Title, Content, Header, IconWrapper} from "./tree-menu.style";
import {Button} from "components/button/button";
import {ArrowNext} from "assets/icons/ArrowNext"
import * as icons from "assets/icons/category-icons";
import {useMedia} from "../../utils/use-media";
import {router} from "next/client";

const Tree = React.memo(
    ({
         item,
         children,
         name,
         icon,
         onClick,
         dropdown,
         depth,
         depthLevel,
         defaultOpen = false,
         setMobilePopup,
     }: any) => {
        // console.log('icons', icon)
        const [isOpen, setOpen] = useState(defaultOpen);
        const desktop = useMedia("(min-width: 992px)");
        useEffect(() => {
            setOpen(defaultOpen);
        }, [defaultOpen]);
        const previous = usePrevious(isOpen);
        const [bind, {height: viewHeight}] = useMeasure();
        const {height, opacity, transform} = useSpring<any>({
            // from: {height: 0, opacity: 0, transform: "translate3d(20px,0,0)"},
            to: {
                height: isOpen ? viewHeight : 0,
                // opacity: isOpen ? 1 : 0,
                // transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
            },
        });
        // const Icon = icon ? Icons[icon] : depth === 'child' ? Icons['Minus'] : null;
        // const Icon = icon ? Icons[icon] : null;
        const Icon = ({iconName, style}: { iconName: any; style?: any }) => {
            const TagName = icons[iconName];
            return !!TagName ? (
                <TagName style={style}/>
            ) : (
                <p>Invalid icon {iconName}</p>
            );
        };
        return (
            <Frame depth={depth} depthLevel={depthLevel}>
                <Header open={isOpen} depth={depth} className={depth}>
                    {icon && (
                        <IconWrapper depth={depth}>
                            <img
                                src={item.thumbnail}
                                alt={item.alt}
                            />
                            {/*<Icon iconName={icon}/>*/}
                        </IconWrapper>
                    )}
                    <Title onClick={() => {
                        item.is_leaf ? onClick(item.slug, null) : onClick(null, item.slug)
                        setMobilePopup(false)
                        dropdown ? setOpen(!isOpen) : onClick();
                    }}>{name}</Title>

                    {dropdown === true && desktop && (
                        <Button
                            onClick={() => setOpen(!isOpen)}
                            variant="text"
                            className="toggleButton"
                        >
                            <ArrowNext width="16px"/>
                        </Button>
                    )}
                </Header>
                <Content
                    style={{
                        opacity,
                        height: isOpen && previous === isOpen ? "auto" : height,
                    }}
                >
                    <animated.div style={{transform}} {...bind} children={children}/>
                </Content>
            </Frame>
        );
    }
);

type Props = {
    className?: any;
    data: any;
    onClick: (slug: string, parentSlug: string) => void;
    active: string | string[];
    setMobilePopup?: any,
};
export const TreeMenu: React.FC<Props> = ({
                                              data,
                                              onClick,
                                              setMobilePopup,
                                              active,
                                          }) => {
    const desktop = useMedia("(min-width: 992px)");
    const {query} = router
    const handler = (children, depth: number) => {
            return children.map((subOption) => {
                if (!subOption.children) {
                    // Leaf category
                    return (
                        <Tree
                            item={subOption}
                            key={subOption.title}
                            name={subOption.title}
                            icon={subOption.thumbnail}
                            depth="child"
                            depthLevel={depth}
                            setMobilePopup={setMobilePopup}
                            onClick={onClick}
                            defaultOpen={active === subOption.slug}
                        />
                    );
                }

                const flattenChildren = (parent, res = []) => {
                    parent.children.forEach((child) => {
                        child.children.length ? flattenChildren(child, res) : res.push(child);
                    });

                    return res;
                };
                if (subOption.children && !subOption.children.is_leaf) {
                    return (
                        <Tree
                            item={subOption}
                            parent={subOption.id}
                            key={subOption.title}
                            name={subOption.title}
                            icon={subOption.thumbnail}
                            dropdown={subOption.children.length > 0}
                            depth="parent"
                            parentId={subOption.id}
                            depthLevel={depth}
                            setMobilePopup={setMobilePopup}
                            onClick={onClick}
                            defaultOpen={
                                active === subOption.slug ||
                                flattenChildren(subOption).some((item) => item.slug === active)
                            }
                        >
                            {desktop && handler(subOption.children, depth + 1)}
                        </Tree>
                    );
                }
            })
        }
    ;

    return <> {handler(data, 0)} </>;
};