import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Modal,Button } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postFavorite,postComment } from '../redux/ActionCreators';
import { Rating, Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
})


function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={1000} delay={1000}>
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}
            >
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                <View style={styles.icons}>
                    <Icon
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type="font-awesome"
                        color="#800080"
                        onPress={props.toggleModal}
                    />
                </View>

            </Card>
            </Animatable.View>
        );
    }
    else {

        return (<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const rendercommentlist = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Rating
                            readonly
                            style={{ paddingVertical: 10 }}
                            startingValue={item.rating}
                            imageSize={20} />
                            
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        )
    }

    return (
        <Animatable.View animation="fadeInUp" duration={1000} delay={1000}>
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={rendercommentlist}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
        </Animatable.View>
    )
}

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            ratings: 5,
            author:"",
            comment:""
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    }
    markFavorite = (dishId) => {
        console.log(this.props.favorites);
        this.props.postFavorite(dishId);
        console.log("marked called");
    }
    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }
    handleComment=(dishId)=>{
        this.props.postComment(dishId,this.state.ratings,this.state.author,this.state.comment);
        this.toggleModal();
    }
    render() {
        const dishId = this.props.navigation.getParam('dishId', '')

        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={this.toggleModal}
                />
                <RenderComments comments={this.props.comments.comments.filter(comment => comment.dishId === dishId)} />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalOpen}
                    onRequestClose={() => {
                        this.toggleModal();
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <Rating
                            showRating
                            onFinishRating={(rating) => this.setState({ ratings: rating })}
                            style={{ paddingVertical: 10 }}
                            defaultRating={5}


                        />

                        <Input
                            placeholder='author'
                            leftIcon={
                                <Icon
                                    name='person'
                                    size={24}
                                    color='black'
                                />
                            }
                            onChangeText={(author)=>this.setState({author:author})}
                        />

                        <Input
                            placeholder='comment'
                            leftIcon={
                                <Icon
                                    name='comment'
                                    size={24}
                                    color='black'
                                />
                            }
                            onChangeText={(comment)=>this.setState({comment:comment})}
                        />
                        <View style={{margin:20}}>
                        <Button style={{margin:20}}
                            onPress={()=>this.handleComment(dishId)}
                            color="#512DA8"
                            title="Submit"
                        />

                        <Button
                            onPress={()=>this.toggleModal()}
                            color="gray"
                            title="Cancel"
                        />
                        </View>
                       


                    </View>
                </Modal>
            </ScrollView>

        )
    }

}

const styles = StyleSheet.create({
    icons: {
        flex: 1,
        justifyContent: "center",
        flexDirection: 'row'
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);