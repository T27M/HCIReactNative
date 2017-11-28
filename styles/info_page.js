import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  scrollWrapper: {
    flexGrow: 1,
  },
  wrapper: {
    flexGrow: 1,
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.25, // can't use '25%' properly with ScrollView
  },
  title: {
    fontSize: 24,
  },
  icon: {
    width: 50,
    height: 50,
    margin: 10,
  },
  imageView: {
    width: '100%',
    height: 200,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentView: {
    margin: 10,
    flex: 1,
    // marginBottom: 500,
  },
  content: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default styles;
