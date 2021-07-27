import { useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { Provider, useStore } from "react-redux";
import { Grid } from "./Grid";
import { Placement } from "./Placement";
import { DropShadow } from "./DropShadow";
import { Border } from "./Border";
import { Util } from "konva/lib/Util";
import { Image as KonvaImage } from "konva/lib/shapes/Image";
import { Rect as KonvaRect } from "konva/lib/shapes/Rect";
import { Line as KonvaLine } from "konva/lib/shapes/Line";
import { Stage as KonvaStage } from "konva/lib/Stage";
import { KonvaEventObject } from "konva/lib/Node";
import { useAppDispatch, useAppSelector } from "../store";
import { selectArtboard, selectPlacement, setSelected } from "../slices/artboard";

export function AppStage({ dropRef }: { dropRef: React.RefObject<KonvaImage> }) {
    const dispatch = useAppDispatch();
    const rectRef = useRef<KonvaRect>(null);
    const placement = useAppSelector(selectPlacement);
    const initialState = { x1: 0, y1: 0, x2: 0, y2: 0, rectMode: false };
    const [{ x1, y1, x2, y2, rectMode }, setState] = useState(initialState);
    const rect = { x: Math.min(x1, x2), y: Math.min(y1, y2), width: Math.abs(x2 - x1), height: Math.abs(y2 - y1) };
    const { width, height, padding } = useAppSelector(selectArtboard);
    const onMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target;
        if (!(stage instanceof KonvaStage || stage instanceof KonvaLine)) return;
        const { x, y } = getLayerXY(e);
        setState({ x1: x, y1: y, x2: x, y2: y, rectMode: true });
        dispatch(setSelected([]));
    };
    const onMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        if (!rectMode) return;
        const { x, y } = getLayerXY(e);
        setState({ x1, y1, x2: x, y2: y, rectMode: true });
    };
    const onMouseUp = (e: KonvaEventObject<MouseEvent>) => {
        if (!rectMode) return;
        const selected: number[] = [];
        placement.forEach((p, i) => {
            if (Util.haveIntersection(rect, p.rect)) selected.push(i);
        });
        dispatch(setSelected(selected));
        setState(initialState);
    };

    return (
        <Stage {...{ onMouseDown, onMouseMove, onMouseUp }} width={width + 2 * padding} height={height + 2 * padding}>
            <Provider store={useStore()}>
                <Layer>
                    <Grid />
                    <Border />
                    <Placement rectMode={rectMode} />
                    <DropShadow dropRef={dropRef} />
                    <Rect {...rect} ref={rectRef} fill="rgba(0,0,255,0.5)" visible={rectMode} />
                </Layer>
            </Provider>
        </Stage>
    );
}

function getLayerXY(e: KonvaEventObject<MouseEvent>) {
    const { clientX, clientY } = e.evt;
    const { x, y } = e.currentTarget.attrs.container.getBoundingClientRect();
    return {
        x: clientX - x,
        y: clientY - y,
    };
}
