'use strict';

import React, { Component } from 'react';
import NavButtons from './NavButtons';
import styles     from '../styles/info_page.js';

import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

export default class TermsAndConditionsView extends Component {
  static NAV_NAME = "T&Cs";

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={false}
        />

        <View style={styles.wrapper}>
          <View style={styles.titleView}>
            <Text style={styles.title}>T&Cs</Text>

            <Image
                style={styles.icon}
                source={require('../img/t_and_c_icon.png')}
            />
          </View>

          <View style={styles.contentView}>
            {this.getTC()}
          </View>
        </View>
      </ScrollView>
    );
  }

  getTC() {
    return (
      <Text style={styles.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo, lorem sit amet imperdiet pellentesque, mi purus facilisis enim, fringilla bibendum nibh libero nec justo. Vivamus fermentum, sapien vitae sodales dictum, tortor est dapibus est, in aliquam arcu augue eu lectus. Pellentesque sed quam non diam mattis consequat id ut urna. Phasellus nibh diam, fringilla facilisis luctus id, commodo et tortor. Mauris auctor diam vitae blandit faucibus. Vivamus et nisi accumsan, lobortis massa sed, sodales dui. Aenean egestas sapien sed velit mattis aliquam eu a erat. Aenean quis ultrices est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In mollis turpis eget risus facilisis fringilla. Maecenas mollis augue eget est commodo, quis molestie purus laoreet. Ut iaculis sagittis odio, eget rhoncus massa imperdiet vulputate. Suspendisse leo ipsum, scelerisque vel ligula eu, rutrum efficitur nunc.
        {"\n\n"}
        Proin sagittis est libero, eu consequat orci scelerisque eget. Curabitur vulputate id eros vitae cursus. Donec non risus quis lacus venenatis malesuada. Fusce interdum nec massa ac finibus. Etiam commodo sapien vel pellentesque interdum. Sed euismod elit eu massa euismod, eu venenatis libero volutpat. Etiam at feugiat dui, vel aliquet erat. Aliquam vehicula nisi quis diam faucibus porttitor. Etiam id porta purus. Etiam facilisis lorem ex, eget bibendum ligula lacinia ultricies. Suspendisse molestie mattis ipsum. Duis consequat consequat eros, ut sagittis libero. Nullam malesuada pharetra mi sed tincidunt.
        {"\n\n"}
        Proin ut erat cursus, feugiat ligula vitae, elementum turpis. Vivamus lacinia mollis pretium. Curabitur ornare interdum ultrices. Proin molestie mi in justo egestas, id hendrerit nunc suscipit. Sed faucibus fermentum tortor vel gravida. Aliquam ex erat, facilisis sit amet dignissim vitae, rutrum eu velit. Proin nec facilisis diam.
        {"\n\n"}
        Aliquam erat volutpat. Duis tempus sit amet enim a tempus. Suspendisse ac nulla elit. Fusce ut est ex. Donec a risus dapibus, mattis ex eu, iaculis magna. Praesent non erat mauris. Donec euismod quam mollis risus porta, a pulvinar purus ornare. Maecenas volutpat arcu metus. Vivamus id malesuada turpis. Donec finibus risus non lacus cursus, sit amet eleifend dui lobortis.
        {"\n\n"}
        Nam tortor nisl, bibendum vitae gravida sed, commodo ac ipsum. Mauris varius placerat ornare. Pellentesque at gravida ipsum. Aenean sit amet dolor vitae ipsum aliquet consequat. Sed id neque orci. Curabitur ut auctor libero. Sed a orci placerat, ultrices elit id, facilisis justo. Nunc euismod augue lacinia turpis facilisis viverra. Phasellus accumsan, orci non elementum egestas, magna leo consequat ante, ornare suscipit nisi nibh sit amet libero. Pellentesque feugiat quis diam a tempus . Nunc aliquet sagittis porta. In augue magna, bibendum nec sem nec, placerat varius nisi. Nulla ac odio euismod, facilisis turpis sed, ullamcorper odio.
        {"\n\n"}
        Phasellus volutpat lectus orci, a accumsan velit mattis et. Praesent vel accumsan lorem. Praesent ipsum ligula, dignissim nec ex et, scelerisque imperdiet nibh. Morbi vitae massa ut ipsum euismod condimentum id et augue. Proin vestibulum enim in sollicitudin facilisis. Integer blandit, augue nec dictum auctor, neque eros bibendum ipsum, at efficitur mauris tortor sed orci. Vestibulum in erat imperdiet, sagittis urna id, gravida arcu. Nullam et dapibus lorem, id egestas ex. Cras ultricies tortor eu est sodales, in volutpat nunc porttitor. Etiam sit amet dignissim metus. Fusce non eros id arcu ornare ornare. Sed hendrerit est sit amet feugiat suscipit. Mauris a imperdiet augue, ac consequat mauris. Vestibulum nec eleifend turpis, eget sollicitudin lectus.
        {"\n\n"}
        Sed pellentesque dolor vel quam lacinia, et consequat arcu maximus. Donec vitae ornare est. Vivamus nec neque odio. Aenean lobortis orci sed neque lacinia faucibus. Sed accumsan porttitor hendrerit. Duis at pretium leo. Cras eu justo ligula. Nullam quis venenatis leo, non tempor ligula. Maecenas accumsan, velit at dapibus porta, neque lacus iaculis dui, id egestas dui mauris ac turpis.
        {"\n\n"}
        Ut commodo tincidunt diam, ut interdum nisi rhoncus nec. Nunc malesuada porta semper. Proin sit amet lorem quis justo ultricies aliquam eget eget mauris. Aenean faucibus risus sed aliquam sodales. Vivamus scelerisque nisl lacus, sit amet porta felis sollicitudin quis. Nunc accumsan nisi sit amet dignissim placerat. Cras eu nisl purus. Vivamus odio nibh, tempus sed nisi eget, dapibus vestibulum enim. Vivamus consequat dolor mauris, id varius augue aliquet a. Etiam porttitor mauris nisl, eu condimentum mauris sodales eu.
        {"\n\n"}
        Quisque felis nunc, mollis nec euismod ac, rutrum non leo. Cras maximus vulputate erat, vitae convallis nibh mollis non. Curabitur in elementum leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Donec luctus vestibulum mi eget dapibus. Pellentesque dapibus, nibh pulvinar fermentum pretium, sem sapien semper odio, ac fringilla dolor lectus et elit. Curabitur non quam cursus, congue arcu sit amet, suscipit sem. Phasellus ligula augue, mollis non tortor cursus, dictum consectetur dolor. Nam sollicitudin risus sit amet efficitur fringilla. Sed ut felis ut ipsum blandit cursus. Aliquam convallis orci vitae massa blandit fringilla. Curabitur eget dui ut massa tristique euismod eget et orci.
        {"\n\n"}
        Ut euismod velit vitae quam ultrices, et lacinia ipsum dictum. Maecenas est nibh, viverra at tincidunt et, semper a nisl. Etiam id leo sit amet ligula viverra cursus id et arcu. Mauris ullamcorper feugiat magna, ac feugiat lacus consequat non. Duis ut purus orci. Nullam mollis vulputate tincidunt. Ut nec leo eget tortor suscipit pellentesque sed porttitor enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis venenatis nibh, vitae blandit orci dictum cursus. Integer neque massa, aliquam et turpis id, aliquam fermentum libero.
      </Text>
    );
  }
}
