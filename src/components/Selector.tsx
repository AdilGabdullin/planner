import { useAppDispatch } from "../store";
import { entities } from "../slices/config";
import { updateDrop } from "../slices/drop";
import styled from "styled-components";
import { useState, useRef, DragEvent, Dispatch, SetStateAction } from "react";

const size = 143;
const emptyDragImage = new Image();
emptyDragImage.src =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function Selector({
  setDropShadow,
}: {
  setDropShadow: Dispatch<SetStateAction<HTMLImageElement>>;
}) {
  // state
  const [state, setState] = useState({
    shift: 0,
    chevrons: [false, true],
  });
  // events
  const dispatch = useAppDispatch();
  const outerWrap = useRef<HTMLDivElement>(null);
  const innerWidth = size * entities.length;
  const move = (direction: number) => {
    if (null === outerWrap.current) return;
    const outerWidth = outerWrap.current.getBoundingClientRect().width;
    const displayed = Math.ceil(outerWidth / size);
    const min = -innerWidth + displayed * size;
    let nextShift = state.shift + displayed * size * direction;
    if (nextShift > 0) nextShift = 0;
    if (nextShift < min) nextShift = min;
    setState({
      shift: nextShift,
      chevrons: [nextShift !== 0, nextShift !== min],
    });
  };
  const handleDragStart = (id: number) => (e: DragEvent) => {
    e.dataTransfer.setDragImage(emptyDragImage, 0, 0);
    const { width, height, offset } = entities[id];
    dispatch(updateDrop({ id, width, height, offset }));
    setDropShadow(entities[id].image);
  };

  return (
    <Carousel>
      <LeftChevron visible={state.chevrons[0]}>
        <img src="/icons/arrow.svg" alt="left" onClick={() => move(1)} />
      </LeftChevron>
      <OuterWrap ref={outerWrap}>
        <InnerWrap width={innerWidth} shift={state.shift}>
          {entities.map(({ file, name, code, price, size }, id) => (
            <Figure key={id} draggable="true" onDragStart={handleDragStart(id)}>
              <img src={`/images/${file}`} alt={name} width={size[0] * 40} />
              <figcaption>
                {name}
                <br />
                {code}
                <br />
                {price} EUR
              </figcaption>
            </Figure>
          ))}
        </InnerWrap>
      </OuterWrap>
      <RightChevron visible={state.chevrons[1]}>
        <img src="/icons/arrow.svg" alt="right" onClick={() => move(-1)} />
      </RightChevron>
    </Carousel>
  );
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
