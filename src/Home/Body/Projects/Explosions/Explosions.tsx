import * as React from 'react';
import * as history from 'history';
import THREE = require('three');
import { isGL } from "../../../../data/helpers/WebGL";
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { IParams } from "../../../../data/models";
import {
    playerPositionX, playerPositionZ, playerRotationY, playerRotationX, isFiring
} from "../../../../data/helpers/controls/keyboard";
import { loadGround } from "./fixtures/ground";
import { loadBackground } from "./fixtures/background";
import { CenteredText } from "../../../../Widgets/CenteredText";
import { explosionsMenuDictionary, explosionsMenuItemList } from "./explosionsMenu/explosionsMenu";
import { Link } from "react-router-dom";

interface IProperties {
    width?: number
    height?: number
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    savedParams?: IParams
}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {
    keysPressed?: string
    mx?: number
    my?: number
    history: history.History
}

interface IState extends IProperties, ICallbacks {
    isFallback: boolean
}

export class Explosions extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    texture;
    point;
    playerFocus = new THREE.Group;
    explosion;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isFallback: false
        };
    }

    componentDidMount() {
        if (isGL())  {
            this.initGL();
        } else {
            this.initGLFallback();
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animateLoop);
        if (isGL()) {
            document.body.removeChild( this.renderer.domElement )
        }
    }

    componentWillReceiveProps(nextProps) {
        const { height, width, savedParams } = this.props;

        const isHeightChanged = nextProps.height !== height;
        const isWidthChanged = nextProps.width !== width;

        if (isHeightChanged || isWidthChanged) {
            this.renderer.setSize( nextProps.width, nextProps.height );
            this.camera.aspect = nextProps.width / nextProps.height;
            this.camera.updateProjectionMatrix();
        }

        const isViewPathChanged = nextProps.savedParams.activeViewPath !== savedParams.activeViewPath;

        if (isViewPathChanged) {
            console.log(this.scene);
            this.removeByName("explosion");
            this.initExplosion(nextProps.savedParams.activeViewPath);
        }
    }

    initGL() {
        this.initRenderer();
        this.initScene();
        this.initCamera();
        this.initLighting();
        this.initAssets();
        this.animate();
    }

    initGLFallback() {
        this.setState({ isFallback: true })
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.props.width, this.props.height );
        document.body.appendChild( this.renderer.domElement );
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera( 45, this.props.width / this.props.height, 1, 4000 );
        this.camera.position.set(0, 16, 50);
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLighting() {
        this.point = new THREE.PointLight( 0xffffff, 0.5 );
        this.playerFocus.add(this.point);
        this.scene.add(new THREE.AmbientLight( 0xffffff, 0.1 ));
    }

    initAssets() {

        this.playerFocus.add(this.camera);
        this.playerFocus.rotation.order = "YXZ";
        this.scene.add(this.playerFocus);

        this.initExplosion(this.props.savedParams.activeViewPath);

        Promise.all([
            loadGround(),
            loadBackground()
        ]).then((meshes) => {
            meshes.map(mesh => this.scene.add(mesh));
        });
    }

    removeByName(name) {
        const obj = this.scene.getObjectByName(name);
        this.scene.remove(obj);
    }

    initExplosion(viewPath) {

        const key = viewPath
                        ?   viewPath
                        :   "basic";

        this.explosion = explosionsMenuDictionary[key].component;
        let explosionObj = this.explosion.render();
        explosionObj.name =  "explosion";

        this.scene.add(explosionObj);
    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderMotion() {
        const { keysPressed, savedParams } = this.props;

        const diffPosX = playerPositionX(keysPressed, this.playerFocus.rotation.y);
        const diffPosY = 0;
        const diffPosZ = playerPositionZ(keysPressed, this.playerFocus.rotation.y);

        const diffRotX = playerRotationX(keysPressed);
        const diffRotY = playerRotationY(keysPressed);
        const diffRotZ = 0;

        this.playerFocus.position.x+=diffPosX;
        this.playerFocus.position.y+=diffPosY;
        this.playerFocus.position.z+=diffPosZ;

        this.playerFocus.rotation.x+=diffRotX;
        this.playerFocus.rotation.y+=diffRotY;
        this.playerFocus.rotation.z+=diffRotZ;

        const isFiringKey = isFiring(keysPressed);

        this.explosion.explode(isFiringKey);

        // this.point.intensity = isFiringKey ? 1 : 0;

        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        const styles = {
            explosions__menu: {

            }
        };
        return (
            this.state.isFallback
            ?  <CenteredText
                    content={"Unable to view due to browser or browser settings. Try another browser or reconfigure your current browser."}
                />
            :   null
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.homeStore.width,
        height: state.homeStore.height,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {}
}

export const ExplosionsFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Explosions);
