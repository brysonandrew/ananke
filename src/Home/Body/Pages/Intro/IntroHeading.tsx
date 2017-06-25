import * as React from 'react';
import { fontSize } from "../../../../data/helpers/breakPoints";

interface IProps {
    isMobile: boolean
    isTablet: boolean
    isLaptop: boolean
}

interface IState {}

export class IntroHeading extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop } = this.props;

        const styles = {
            helloHeading: {
                fontSize: fontSize.XXL(isMobile, isTablet, isLaptop)
            }
        } as any;
        return (
            <div style={ styles.helloHeading }>
                <pre>{`P R E S S  A N Y  K E Y  T O  B E G I N`}</pre>
            </div>
        );
    }
}
