import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
const {height} = Dimensions.get('window');
import images from '../global/images';
import {Constant} from '../global';

const CustomDropdown = ({options, selectedValue, onSelect}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = item => {
    onSelect(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.dropdownButton}>
        <Text
          style={{
            fontSize: Constant.textFontSize(14),
            fontWeight: '400',
            color: '#4F5168',
          }}>
          Most Popular
        </Text>
        <Image source={images.down} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,

    borderRadius: 10,
    width: 170,
    backgroundColor: '#fff',
  },
  selectedValue: {
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    // flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    height: '30%',
  },
  optionText: {
    padding: 10,
    fontSize: Constant.textFontSize(18),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

// Example usage
const MyComponent = () => {
  const dropdownOptions = [
    'Option 1',
    'Option 2',
    'Option 3',
    'data1',
    'data2',
  ];
  const [selectedOption, setSelectedOption] = useState('Select an option');

  return (
    <View>
      <CustomDropdown
        options={dropdownOptions}
        selectedValue={selectedOption}
        onSelect={setSelectedOption}
      />
    </View>
  );
};

export default MyComponent;
