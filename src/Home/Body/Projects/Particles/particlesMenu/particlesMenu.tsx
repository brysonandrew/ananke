import { toPath } from "../../../../../data/helpers/toPath";
import { IDictionary, IProject } from "../../../../../data/models";
import { BasicExplosion } from "../../particleModels/explosions/Basic/flame";
import { RandomSparks } from "../../particleModels/explosions/RandomSparks/flame";
import { FireBlade } from "../../particleModels/elements/FireBlade/flame";
import { Flame } from "../../particleModels/elements/Fire/flame";

function Project(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const particlesMenuItemList: IProject[] = [
    new Project(
        "Basic",
        new BasicExplosion
    ),
    new Project(
        "Embers",
        new RandomSparks
    ),
    new Project(
        "Fire Blade",
        new FireBlade
    ),
    new Project(
        "Fire",
        new Flame
    )
];

export const particlesMenuDictionary: IDictionary<IProject> = particlesMenuItemList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
