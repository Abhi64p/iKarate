import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, TouchableWithoutFeedback,
    TouchableOpacity, FlatList
} from 'react-native';
import CardView from 'react-native-cardview';
import CheckBox from '@react-native-community/checkbox';
import { responsiveFontSize, responsiveWidth } from './Helper';
import Database from './Database';

class HistoryScreen extends Component {

    state = {
        marks: [],
        rowCount: 0,
        selectedMarkIds : []
    }

    constructor(props) {
        super(props);
        db = new Database();
        db.readAllMarks().then((marks) => {
            this.setState({ marks: marks });
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CardView cardElevation={2} cardMaxElevation={2} style={styles.topBar}>
                    <TouchableWithoutFeedback onPress={this.backPressed}>
                        <Image source={require('./images/back.png')} style={styles.backImage}></Image>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>History</Text>
                    <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
                        <TouchableOpacity><Image style={styles.icon} source={require('./images/print.png')} resizeMode='contain'></Image></TouchableOpacity>
                        <TouchableOpacity><Image style={styles.icon} source={require('./images/delete.png')} resizeMode='contain'></Image></TouchableOpacity>
                    </View>
                </CardView>
                <View style={{ margin: 10, flex: 10 }}>

                    <FlatList
                        data={this.state.marks}
                        renderItem={({ item }) => (
                            <View style={{
                                marginTop: 3, marginBottom: 3, paddingTop: 5, paddingBottom: 5,
                                borderColor: '#1e88e5', borderWidth: 2, borderRadius: 5
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{flexDirection: 'row', flex:9}}>
                                        <Text style={styles.columnStyle}>{item.Name}</Text>
                                        <Text style={styles.columnStyle}>{'Score : ' + item.FinalScore}</Text>
                                    </View>
                                    <View style={{ marginRight: 10, flex: 1 }}>
                                        <CheckBox
                                            tintColors={{ true: '#1e88e5' }}
                                            value={this.state.selectedMarkIds.indexOf(item.Id) != -1}
                                            onValueChange={()=>{this.checkBoxClicked(item.Id)}}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: fontSizes.small, fontWeight: 'bold', flex: 1, marginLeft: 10 }}>{'T\nA'}</Text>
                                    {
                                        item.JudgeScore.split(';').map((item, key) => (
                                            item.length != 0 &&
                                            <Text key={key} style={{ fontSize: fontSizes.small, flex: 1 }}>{item.split(',')[0] + '\n' + item.split(',')[1]}</Text>
                                        ))
                                    }
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.Id + ''}
                    />
                    {this.state.marks.length === 0 && <Text style={{
                        fontSize: fontSizes.medium, width: '100%', height: '100%',
                        textAlign: 'center', textAlignVertical: 'center'
                    }}>Empty!</Text>}
                </View>
            </View>
        );
    }

    backPressed = () => {
        this.props.navigation.goBack();
    }

    checkBoxClicked = (Id) => {
        let selectedMarkIds = this.state.selectedMarkIds;
        if (selectedMarkIds.indexOf(Id) > -1)
            selectedMarkIds = this.removeElement(selectedMarkIds, Id);
        else
            selectedMarkIds.push(Id);
        this.setState({ selectedMarkIds: selectedMarkIds });
        alert('Here!');
    }

    removeElement(arr, element) {
        return arr.filter(function (ele) {
            return ele !== element;
        });
    }
}

const fontSizes = {
    large: responsiveFontSize(3.5),
    medium: responsiveFontSize(2.5),
    small: responsiveFontSize(2)
}

const backBox = responsiveWidth(6);
const iconBox = responsiveWidth(8);

const styles = StyleSheet.create({
    topBar: {
        width: '100%',
        height: 50,
        maxHeight: 50,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    title: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        color: '#37474f'
    },
    backImage: {
        marginLeft: 10,
        marginRight: 10,
        width: backBox,
        height: backBox
    },
    icon: {
        width: iconBox,
        height: iconBox,
        marginRight: 10
    },
    columnStyle: {
        flex: 1,
        fontSize: fontSizes.medium,
        marginLeft: 10
    }
});

export default HistoryScreen;