import React, {Component} from 'react';
import {ScrollView,Text,View} from 'react-native';
import {Card} from 'react-native-elements';
import {baseUrl} from '../shared/baseUrl';
import {connect} from 'react-redux';
import {Loading} from './LoadingComponent';

const mapStateToProps=state=>{
    return{
        dishes:state.dishes,
        leaders:state.leaders,
        comments:state.comments,
        promotions:state.promotions
    }
}


function RenderItem(props){
    const item = props.item;

    if (props.isLoading) {
        return(
                <Loading />
        );
    }
    else if (props.errMess) {
        return(
            <View> 
                <Text>{props.erreMess}</Text>
            </View>
        );
    }
    else {        
        if (item != null) {
            return(
                <Card
                    featuredTitle={item.name}
                    featuredSubtitle={item.designation}
                    image={{uri: baseUrl + item.image}}>
                    <Text
                        style={{margin: 10}}>
                        {item.description}</Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
    }
    
}

class Home extends Component{
   
    static navigationOptions = {
        title:'Homeee'
    };
    render(){
        return(
            <ScrollView>
                <RenderItem item = {this.props.dishes.dishes.filter(dish=>dish.featured)[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess} />
                <RenderItem item = {this.props.promotions.promotions.filter(promotion=>promotion.featured)[0]}
                isLoading={this.props.promotions.isLoading}
                errMess={this.props.promotions.errMess}/>
                <RenderItem item = {this.props.leaders.leaders.filter(dish=>dish.featured)[0]}
                 isLoading={this.props.leaders.isLoading}
                 errMess={this.props.leaders.errMess} />

            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Home);