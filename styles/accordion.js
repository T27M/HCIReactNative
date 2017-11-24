import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  AccordionHeader: {
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#a9a9a9',
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AccordionHeaderText: {
    flex: 1
  },
  AccordionContent: {
    flex: 1,
    backgroundColor: '#31364D'
  },
  AccordionContentText: {
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    color: '#fff',
  },
});

export default styles;
