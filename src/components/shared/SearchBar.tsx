import {Colors} from '@/styles/theme';
import {SearchSettingsIcon} from '@assets/index';
import {SearchIcon} from '@assets/index';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import CustomTextInput from '@/components/shared/CustomTextInput';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <SearchIcon style={styles.SearchContainer} width={20} height={20} />
      <View style={styles.inputContainer}>
        <CustomTextInput InputText="Search Keywords.." style={styles.input} />
      </View>
      <SearchSettingsIcon
        style={styles.searchSettingsContainer}
        width={20}
        height={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.InputBackground,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  SearchContainer: {
    marginLeft: 21,
  },
  inputContainer: {
    flex: 1,
    marginLeft: 19,
  },
  input: {
    flex: 1,
  },
  searchSettingsContainer: {
    marginRight: 23,
  },
});

export default SearchBar;
