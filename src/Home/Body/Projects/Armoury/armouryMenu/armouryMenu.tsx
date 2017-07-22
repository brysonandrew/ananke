import { toPath } from "../../../../../data/helpers/toPath";
import { IDictionary, IProject } from "../../../../../data/models";
import { GatlingGun } from '../weapons/GatlingGun/gatlingGun';
import { Uzi } from '../weapons/Uzi/uzi';

function Project(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const armouryMenuItemList: IProject[] = [
    new Project(
        "Gatling Gun",
        new GatlingGun
    ),
    new Project(
        "Uzi",
        new Uzi
    )
];

export const armouryMenuDictionary: IDictionary<IProject> = armouryMenuItemList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
