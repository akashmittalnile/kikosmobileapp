import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Constant} from '../global';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    {id: '1', uri: 'image1.jpg'},
    {id: '2', uri: 'image2.jpg'},
    {id: '3', uri: 'image3.jpg'},
    // Add more image data as needed
  ];

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + data.length) % data.length);
  };

  const renderItem = ({item, index}) => (
    <View style={styles.imageContainer}>
      <Image source={{uri: item.uri}} style={styles.image} />
      <Text style={styles.imageText}>{`${index + 1}/${data.length}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const newIndex = Math.floor(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width,
          );
          setCurrentIndex(newIndex);
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageText: {
    position: 'absolute',
    bottom: 16,
    color: 'white',
    fontSize: Constant.textFontSize(16),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  buttonText: {
    fontSize: Constant.textFontSize(18),
    color: 'blue',
  },
});

export default ImageCarousel;
