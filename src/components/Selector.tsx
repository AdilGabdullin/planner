import { useState, useRef, DragEventHandler, DragEvent } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store";
import { selectFurniture, setDrop, addMagnets, removeMagnets, setSelected } from "../slices/artboard";
import { FurnitureType } from "../config";

export function Selector() {
    // state
    const [state, setState] = useState({
        shift: 0,
        chevrons: [false, true],
    });
    const size = 143;
    const furniture = useAppSelector(selectFurniture);
    const outerWrap = useRef<HTMLDivElement>(null);
    const innerWidth = size * furniture.length;

    // events
    const dispatch = useAppDispatch();
    const move = (direction: number) => {
        if (null === outerWrap.current) return;
        const outerWidth = outerWrap.current.getBoundingClientRect().width;
        const displayed = Math.floor(outerWidth / size);
        const min = -innerWidth + displayed * size;
        let nextShift = state.shift + displayed * size * direction;
        if (nextShift > 0) nextShift = 0;
        if (nextShift < min) nextShift = min;
        setState({ shift: nextShift, chevrons: [nextShift !== 0, nextShift !== min] });
    };
    const handleDragStart: DragEventHandler = (e) => {
        const { target } = e;
        if (!(target instanceof Element)) return;
        const id = target.getAttribute("data-furniture-id");
        if (id === null) return;
        setEmptyDragImage(e);
        dispatch(setDrop({ id: +id }));
        dispatch(setSelected([]));
        const type = furniture[+id].type;
        if (type === FurnitureType.LeftCorner || type === FurnitureType.RightCorner) {
            dispatch(addMagnets());
        }
    };
    const handleDragEnd: DragEventHandler = (e) => {
        dispatch(setDrop({ visible: false }));
        dispatch(removeMagnets());
    };
    return (
        <Carousel>
            <LeftChevron visible={state.chevrons[0]}>
                <img src="/images/icons/arrow.svg" alt="left" onClick={() => move(1)} />
            </LeftChevron>
            <OuterWrap ref={outerWrap}>
                <InnerWrap width={innerWidth} shift={state.shift}>
                    {furniture.map(({ file, name, code, price, selectorWidth }, i) => (
                        <Figure
                            key={i}
                            draggable="true"
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            data-furniture-id={i}
                        >
                            <img src={`/images/${file}`} alt={name} width={selectorWidth} data-furniture-id={i} />
                            <figcaption>
                                {name} <br /> {code} <br /> {price} EUR{" "}
                            </figcaption>
                        </Figure>
                    ))}
                </InnerWrap>
            </OuterWrap>
            <RightChevron visible={state.chevrons[1]}>
                <img src="/images/icons/arrow.svg" alt="right" onClick={() => move(-1)} />
            </RightChevron>
        </Carousel>
    );
}

const emptyImage = new Image();
emptyImage.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
function setEmptyDragImage(e: DragEvent) {
    e.dataTransfer.setDragImage(emptyImage, 0, 0);
}

const Carousel = styled.div`
    display: flex;
`;

const LeftChevron = styled.div<{ visible: boolean }>`
    transform: rotate(180deg);
    align-self: center;
    opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const RightChevron = styled(LeftChevron)`
    transform: none;
`;

const OuterWrap = styled.div`
    margin: 0 5px;
    overflow: hidden;
`;

const InnerWrap = styled.div<{ width: number; shift: number }>`
    transition: transform 1s;
    margin: 20px -15px;
    width: ${(props) => props.width}px;
    transform: translateX(${(props) => props.shift}px);
`;

const Figure = styled.figure`
    display: block;
    position: relative;
    width: 113px;
    height: 141px;
    float: left;
    margin: 0 15px;
    text-align: center;
    background-color: #f7f7f7;
    text-align: left;
    figcaption {
        position: absolute;
        font: 12px AtlasGrotesk-Regular;
        left: 2px;
        bottom: 3px;
    }
`;
