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
                <pre>{`H E L L O`}</pre>
            </div>
        );
    }
}
