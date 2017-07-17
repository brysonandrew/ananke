import { toPath } from "../../../../../data/helpers/toPath";
import { IDictionary, IProject } from "../../../../../data/models";
import { BasicExplosion } from "../../particleModels/explosions/Basic/flame";
import { RandomSparks } from "../../particleModels/explosions/RandomSparks/flame";

function Project(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const explosionsMenuItemList: IProject[] = [
    new Project(
        "Basic",
        new BasicExplosion
    ),
    new Project(
        "Embers",
        new RandomSparks
    )
];

export const explosionsMenuDictionary: IDictionary<IProject> = explosionsMenuItemList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
