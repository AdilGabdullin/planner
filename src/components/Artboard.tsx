import { Image as KonvaImage } from "konva/lib/shapes/Image";
import { DragEventHandler, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";
import styled from "styled-components";
import { artboard, entities } from "../slices/config";
import { selectDrop } from "../slices/drop";
import { place, selectPlacement } from "../slices/placement";
import { useAppDispatch, useAppSelector } from "../store";
import { Grid } from "./Grid";

const { width, height, gridStep, padding } = artboard;
export function Artboard({ dropShadow }: { dropShadow: HTMLImageElement }) {
  // state
  const { id, offset } = useAppSelector(selectDrop);
  const placement = useAppSelector(selectPlacement);
  // events
  const dispatch = useAppDispatch();
  const shadowRef = useRef<KonvaImage>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const round = (x: number) =>
    Math.round((x - padding) / gridStep) * gridStep + padding;
  const handleDragOver: DragEventHandler = (e) => {
    e.preventDefault();
    const shadow = shadowRef.current;
    const stage = stageRef.current;
    if (shadow === null || stage === null) return;
    const { x: stageX, y: stageY } = stage.getBoundingClientRect();
    shadow.setAttrs({
      x: round(e.clientX - stageX) + offset[0],
      y: round(e.clientY - stageY) + offset[1],
      visible: true,
    });
  };
  const handleDrop: DragEventHandler = (e) => {
    e.preventDefault();
    const shadow = shadowRef.current;
    if (shadow === null) return;
    shadow.visible(false);
    const { x, y } = shadow.attrs;
    dispatch(place({ x, y, rotation: 0, id }));
  };
  const handleDragLeave: DragEventHandler = (e) => {
    const shadow = shadowRef.current;
    if (shadow === null) return;
    shadow.visible(false);
  };
  return (
    <Wrap
      ref={stageRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <Stage width={width + 2 * padding} height={height + 2 * padding}>
        <Layer>
          <Grid {...{ width, height, padding, gridStep }} />
          {placement.map(({ id, x, y, rotation }, key) => (
            <Image {...{ key, x, y, rotation }} image={entities[id].image} />
          ))}
          <Image ref={shadowRef} image={dropShadow} visible={false} />
        </Layer>
      </Stage>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: table;
`;
