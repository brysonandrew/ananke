import * as React from 'react';
import { IProject } from './models';
import { toPath } from "./helpers/toPath";
import { IDictionary } from "./models";
import { IntroFromStore } from "../Home/Body/Pages/Intro/Intro";
import { MainFromStore } from "../Home/Body/Pages/Main/Main";
import { SpotlightFromStore } from "../Home/Body/Projects/Spotlight/Spotlight";
import { CruisingFromStore } from "../Home/Body/Projects/Cruising/Cruising";
import { FPSFromStore } from "../Home/Body/Projects/FPS/FPS";
import { ExplosionsFromStore } from "../Home/Body/Projects/Explosions/Explosions";
import { ArmouryFromStore } from "../Home/Body/Projects/Armoury/Armoury";
import {explosionsMenuItemList} from "../Home/Body/Projects/Explosions/explosionsMenu/explosionsMenu";

function Project(name, component, subComponents?) {
    this.name= name;
    this.path= toPath(this.name);
    this.subComponents= subComponents;
    this.component= component;
}

export const contentsList: IProject[] = [
    new Project(
        "Intro",
        <IntroFromStore/>
    ),
    new Project(
        "Main",
        <MainFromStore/>
    ),
    new Project(
        "Spotlight",
        <SpotlightFromStore/>
    ),
    new Project(
        "Cruising",
        <CruisingFromStore/>
    ),
    new Project(
        "FPS",
        <FPSFromStore/>
    ),
    new Project(
        "Explosions",
        <ExplosionsFromStore/>,
        explosionsMenuItemList
    ),
    new Project(
        "Armoury",
        <ArmouryFromStore/>
    )
];

export const pagePaths = contentsList.map(content => content.name.toLowerCase());

export const contents: IDictionary<IProject> = contentsList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
