import * as React from 'react';
import { Header, Container, Segment, Button } from 'semantic-ui-react';
interface Props {

}

interface CostFunction {
    (): number;
}

interface Beverage {
    getDescription: Function;
    setDescription: Function;
    cost: CostFunction;
}

interface CoffeeCondimentArg {
    baseBeverage: Beverage;
    costModification: number;
    descriptionModification:string;

}

class Coffee implements Beverage {
    private description: string;
    getDescription = () => { return this.description };
    setDescription = (newDescription: string) => { this.description = newDescription };
    cost = () => {
        return 2.99;
    }
    constructor() {
        this.description = '';
        this.setDescription('Java Home Brew');
    }
}

class CoffeeCondiment extends Coffee {
    private beverage: Beverage;
    private descriptionModification:string;
    private costModification: number;
    constructor(args: CoffeeCondimentArg) {
        super();
        this.beverage = args.baseBeverage;
        this.costModification = args.costModification;
        this.descriptionModification = args.descriptionModification;
    }
    cost = ()=>{
        return this.beverage.cost() + this.costModification;
    }
    getDescription = ()=>{
        return this.beverage.getDescription() + ' ' + this.descriptionModification;
    }
}

const DecoratorTester: React.FC<Props> = () => {
    // pre-selected a beverage for you!
    // actually in practice berverage should be an array that hold all the ordered items
    // for simplicity we skip that layer
    const [currentBeverage, setCurrentBeverage] = React.useState<Beverage>(new Coffee());

    return <div>
        <Container>
            <Segment>
                <Header as='h3'>Welcome to Decorator Coffee</Header>
            </Segment>
            <Segment>
                <Header as='h4'>Menu</Header>
                <Segment raised>
                    <div className='menu-row' style={{ textAlign: 'left' }}>
                        <div className='menu-item-row-container'>
                            <span className='menu-item-name'><b>Java Home Brew</b></span>
                            <span className='menu-item-price'>
                                <Button className='condiment-button'
                                    onClick={() => {
                                        setCurrentBeverage(new Coffee());
                                    }}
                                    disabled = {(currentBeverage != null)}
                                >Select</Button>
                                <span>$ 2.99</span>
                            </span>
                        </div>
                        <div className='menu-item-condiments'>
                            <Button className='condiment-button' disabled = {!(currentBeverage != null)}
                                onClick={()=>{setCurrentBeverage(new CoffeeCondiment({
                                    baseBeverage:currentBeverage,
                                    costModification: 0.00,
                                    descriptionModification: 'with mike',
                                }))}}
                            >Add Milk</Button>
                            <span>$ 0.00</span>
                        </div>
                        <div className='menu-item-condiments'>
                            <Button className='condiment-button' disabled = {!(currentBeverage != null)}
                                onClick={()=>{setCurrentBeverage(new CoffeeCondiment({
                                    baseBeverage:currentBeverage,
                                    costModification: 0.00,
                                    descriptionModification: 'with Suger',
                                }))}}
                            >Add Suger</Button>
                            <span>$ 0.00</span>
                        </div>
                        <div className='menu-item-condiments'>
                            <Button className='condiment-button'disabled = {!(currentBeverage != null)}
                                onClick={()=>{setCurrentBeverage(new CoffeeCondiment({
                                    baseBeverage:currentBeverage,
                                    costModification: 0.40,
                                    descriptionModification: 'with mocha',
                                }))}}
                            >Add Mocha</Button>
                            <span>$ 0.40</span>
                        </div>
                        <div className='menu-item-condiments'>
                            <Button className='condiment-button'disabled = {!(currentBeverage != null)}
                                onClick={()=>{setCurrentBeverage(new CoffeeCondiment({
                                    baseBeverage:currentBeverage,
                                    costModification: 0.30,
                                    descriptionModification: 'with whip',
                                }))}}
                            >Add Whip</Button>
                            <span>$ 0.30</span>
                        </div>

                    </div>
                </Segment>
                <Segment basic>
                    <Header as='h4'>Your Order</Header>
                    <div className='menu-row' style={{ textAlign: 'left' }}>
                        {
                            currentBeverage != null &&
                            <>
                                <div className='menu-item-row-container'>
                                    <span className='menu-item-name'><b>{currentBeverage.getDescription()}</b></span>
                                </div>
                                <div className='menu-item-condiments'>Total: $ {currentBeverage.cost().toFixed(2)}</div>
                            </>
                        }
                        {
                            !(currentBeverage != null) &&
                            <div>
                                <span>No order</span>
                            </div>
                        }

                    </div>
                </Segment>
            </Segment>

        </Container>
    </div>
}

export { DecoratorTester }