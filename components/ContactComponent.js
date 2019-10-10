import React ,{Component} from 'react';
import {Card} from 'react-native-elements';
import {Text} from 'react-native';


class Contact extends Component{

    render(){

        return(
            <Card
                title = "Contact Information"
            >
                <Text style={{margin:10}}>
                121, Clear Water Bay Road{"/n"}
                Clear Water Bay, Kowloon{"\n"}{"\n"}
                HONG KONG{"\n"}{"\n"}
                Tel: +852 1234 5678{"\n"}{"\n"}
                Fax: +852 8765 4321{"\n"}{"\n"}
                Email:confusion@food.net{"\n"}
                </Text>

            </Card>
        )
    }
}

export default Contact;