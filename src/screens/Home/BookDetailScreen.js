import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomHeader from '../../components/CustomeHeader';
import {dimensions} from '../../utility/Mycolors';
import images from '../../global/images';
import COLORS from '../../global/Colors';
import AntDesign from 'react-native-vector-icons';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import {Constant} from '../../global';
const BookDetailScreen = props => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
  ];
  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#EAEDF7'}}>
      <CustomHeader
        backarrow={true}
        title={'North Shore'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={{padding: 20}}>
        <Text style={styles.titleTxt}>North Shore</Text>
        <Text style={styles.forAllTxt}>For All Ages! Great For Families!</Text>
        <View style={styles.thirdRow}>
          <View style={styles.iconTxtContainer}>
            <Image tintColor={'#3DA1E3'} source={images.gallaryicon} />
            <Text style={styles.photoTxt}>432 Photos</Text>
          </View>
          <View style={[styles.iconTxtContainer, {marginLeft: 10}]}>
            <Image source={images.videoIcon} />
            <Text style={styles.photoTxt}>432 Photos</Text>
          </View>
        </View>
        <View style={styles.uploadTxtImgContainer}>
          <Image
            tintColor={'#292D32'}
            style={{height: 14, width: 14}}
            source={images.calandertick}
          />
          <Text style={styles.uploadTxt}>
            Uploaded On 13 October 2023:09:34 AM
          </Text>
        </View>
      </View>
      <View>
        <FlatList
          data={data}
          horizontal={true}
          pagingEnabled
          // onViewableItemsChanged={onViewableItemsChanged}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          renderItem={({item, index}) => {
            return (
              <View style={styles.cardContainer}>
                <Image
                  style={styles.imageContainer}
                  resizeMode="contain"
                  source={item.image}
                />
              </View>
            );
          }}
        />
      </View>
      <View style={styles.txtTotal}>
        <TouchableOpacity style={styles.whiteCircle}>
          <Image
            tintColor={'black'}
            style={{transform: [{rotate: '180deg'}]}}
            source={images.arrowsRight}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={styles.countTxt}>{`${currentIndex}/${data.length}`}</Text>
        </View>
        <TouchableOpacity style={styles.whiteCircle}>
          <Image tintColor={'black'} source={images.arrowsRight} />
        </TouchableOpacity>
      </View>
      <CustomButtonRound
        txtStyle={{
          color: '#CECECE',
          fontSize: Constant.textFontSize(14),
          fontWeight: '400',
        }}
        backgroundColor={'#FFFFFF'}
        title={'Purchase At $23.00'}
      />
      <CustomButtonRound
        txtStyle={{
          color: '#CECECE',
          fontSize: Constant.textFontSize(14),
          fontWeight: '400',
        }}
        backgroundColor={'#FFFFFF'}
        title={'Purchase At $23.00'}
      />
    </View>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
  },
  imageContainer: {
    height: Dimensions.get('screen').width * 0.75,
    width: Dimensions.get('screen').width * 0.75,
  },
  photoTxt: {
    fontSize: Constant.textFontSize(12),
    fontWeight: '400',
    color: COLORS.Primary_Blue,
  },
  iconTxtContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  titleTxt: {
    fontSize: Constant.textFontSize(16),
    fontWeight: '600',
    color: 'black',
    fontWeight: '700',
  },
  forAllTxt: {
    fontSize: Constant.textFontSize(12),
    fontWeight: '400',
    lineHeight: 20,
    color: '#1F191C',
  },
  uploadTxt: {
    fontSize: Constant.textFontSize(12),
    fontWeight: '400',
    lineHeight: 20,
    color: 'black',
    fontWeight: '400',
  },
  uploadTxtImgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  txtTotal: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  whiteCircle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countTxt: {
    fontSize: Constant.textFontSize(16),
    fontWeight: 'bold',
    color: '#1F191C',
  },
});
