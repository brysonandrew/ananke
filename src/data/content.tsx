import * as React from 'react';
import { IPage } from './models';
import { toPath } from "./helpers/toPath";
import { IDictionary } from "./models";
import { IntroFromStore } from "../Home/Body/Pages/Intro/Intro";
import { MainFromStore } from "../Home/Body/Pages/Main/Main";

function Page(name, component) {
    this.name= name;
    this.path= toPath(this.name);
    this.component= component;
}

export const contentsList: IPage[] = [
    new Page(
        "Intro",
        <IntroFromStore/>
    ),
    new Page(
        "Main",
        <MainFromStore/>
    )
];

export const contents: IDictionary<IPage> = contentsList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
