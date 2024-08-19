import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Star = ({type, color}) => {
  let iconName = 'star-o';
  if (type === 'full') {
    iconName = 'star';
  } else if (type === 'half') {
    iconName = 'star-half-o';
  }

  return (
    <FontAwesome
      name={iconName}
      size={18}
      color={color}
      style={{marginRight: 2}}
    />
  );
};

export default Star;
