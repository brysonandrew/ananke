import * as React from 'react';
import { IProject } from './models';
import { toPath } from "./helpers/toPath";
import { IDictionary } from "./models";

import { IntroFromStore } from '../Home/Body/Pages/Intro/Intro';

import { SpotlightFromStore } from "../Home/Body/Projects/Spotlight/Spotlight";

import { CruisingFromStore } from "../Home/Body/Projects/Cruising/Cruising";

import { FPSFromStore } from "../Home/Body/Projects/FPS/FPS";

import { ParticlesFromStore } from "../Home/Body/Projects/Particles/Particles";
import { particlesMenuItemList } from "../Home/Body/Projects/Particles/particlesMenu/particlesMenu";

import { ArmouryFromStore } from "../Home/Body/Projects/Armoury/Armoury";
import { armouryMenuItemList } from '../Home/Body/Projects/Armoury/armouryMenu/armouryMenu';

import { GarageFromStore } from '../Home/Body/Projects/Garage/Garage';
import { garageMenuItemList } from '../Home/Body/Projects/Garage/garageMenu/garageMenu';


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
        "Particles",
        <ParticlesFromStore/>,
        particlesMenuItemList
    ),
    new Project(
        "Armoury",
        <ArmouryFromStore/>,
        armouryMenuItemList
    ),
    new Project(
        "Garage",
        <GarageFromStore/>,
        garageMenuItemList
    )
];

export const pagePaths = contentsList.map(content => content.name.toLowerCase());

export const contents: IDictionary<IProject> = contentsList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
