import React, { useContext } from 'react'
import { Image, View, Dimensions } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { scale, verticalScale } from '../../../utils/scaling'
import styles from './styles'
import TextDefault from '../../Text/TextDefault/TextDefault'
import ThemeContext from '../../../ui/ThemeContext/ThemeContext'
import { theme } from '../../../utils/themeColors'
import { useNavigation } from '@react-navigation/native'
import Animated from 'react-native-reanimated'
import {
  BorderlessButton,
  FlatList,
  RectButton,
  TouchableOpacity
} from 'react-native-gesture-handler'
import { alignment } from '../../../utils/alignment'
import TextError from '../../Text/TextError/TextError'

const { height } = Dimensions.get('screen')
const TOP_BAR_HEIGHT = height * 0.08
const AnimatedIon = Animated.createAnimatedComponent(Ionicons)
const AnimatedBorderless = Animated.createAnimatedComponent(BorderlessButton)

function ImageTextCenterHeader(props, ref) {
  const flatListRef = ref
  const navigation = useNavigation()
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]
  const CATEGORY_IMAGES = {
    PIZZAS: require('../../../assets/icons/pizza.png'),
    BURGERS: require('../../../assets/icons/burger.png'),
    PASTAS: require('../../../assets/icons/pasta.png'),
    FRIES: require('../../../assets/icons/fries.png'),
    EXTRAS: require('../../../assets/icons/extras.png'),
    PLATTERS: require('../../../assets/icons/platter.png'),
    SANDWICHES: require('../../../assets/icons/sandwich.png'),
    APPETIZERS: require('../../../assets/icons/appetizers.png'),
    WRAPS: require('../../../assets/icons/wrap.png')
  }
  const aboutObject = {
    latitude: props.restaurant ? props.restaurant.location.latitude : '',
    longitude: props.restaurant ? props.restaurant.location.longitude : '',
    address: props.restaurant ? props.restaurant.address : '',
    restaurantName: props.restaurant ? props.restaurant.name : '...',
    restaurantImage: props.restaurant ? props.restaurant.image : '...',
    deliveryTime: props.restaurant ? props.restaurant.deliveryTime : '...',
    contactNumber: props.restaurant ? props.restaurant.contactNumber : '...',
    whatsappNumber: props.restaurant ? props.restaurant.whatsappNumber : '...',
    isAvailable: props.restaurant ? props.restaurant.isAvailable : true,
    openingTimes: props.restaurant
      ? props.restaurant.openingTimes
      : { startTime: [0, 0], endTime: [0, 0], title: 'CLOSED' },
    isOpen: () => {
      if (!props.restaurant) return true
      const date = new Date()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      return (
        hours >= Number(props.restaurant.openingTimes.startTime[0]) &&
        minutes >= Number(props.restaurant.openingTimes.startTime[1]) &&
        hours <= Number(props.restaurant.openingTimes.endTime[0]) &&
        minutes <= Number(props.restaurant.openingTimes.endTime[1])
      )
    }
  }

  const emptyView = () => {
    return (
      <View
        style={{
          width: '100%',
          height: verticalScale(40),
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <TextError text="No items exists" />
      </View>
    )
  }

  return (
    <Animated.View
      style={[
        styles(currentTheme).mainContainer,
        {
          height: props.height,
          backgroundColor: props.loading
            ? 'transparent'
            : currentTheme.headerBackground
        }
      ]}>
      <Animated.View
        style={{ 
          // height: Animated.sub(props.height, TOP_BAR_HEIGHT) 
          }}>
        <Animated.Image
          resizeMode="cover"
          source={{ uri: aboutObject.restaurantImage }}
          style={[styles().flex, { opacity: props.opacity, borderRadius: 10 }]}
        />
        <Animated.View style={styles().overlayContainer}>
          <View style={styles().fixedViewNavigation}>
            <View style={styles().fixedIcons}>
              <AnimatedBorderless
                activeOpacity={0.7}
                rippleColor={currentTheme.rippleColor}
                style={[
                  styles().touchArea,
                  {
                    backgroundColor: props.iconBackColor,
                    borderRadius: props.iconRadius,
                    height: props.iconTouchHeight,
                    width: props.iconTouchWidth
                  }
                ]}
                onPress={() => navigation.goBack()}>
                <AnimatedIon
                  name="arrow-back"
                  style={{
                    color: props.iconColor,
                    fontSize: props.iconSize
                  }}
                />
              </AnimatedBorderless>
              <Animated.Text
                numberOfLines={1}
                style={[
                  styles(currentTheme).headerTitle,
                  {
                    // opacity: Animated.sub(1, props.opacity),
                    marginBottom: props.headerTextFlex
                  }
                ]}>
                Delivery {aboutObject.deliveryTime} Minute{' '}
              </Animated.Text>
              {!props.loading && (
                <AnimatedBorderless
                  activeOpacity={0.7}
                  rippleColor={currentTheme.rippleColor}
                  style={[
                    styles().touchArea,
                    {
                      backgroundColor: props.iconBackColor,
                      borderRadius: props.iconRadius,
                      height: props.iconTouchHeight,
                      width: props.iconTouchWidth
                    }
                  ]}
                  onPress={() => {
                    navigation.navigate('About', {
                      restaurantObject: {
                        ...aboutObject,
                        isOpen: null
                      },
                      tab: true
                    })
                  }}>
                  <AnimatedIon
                    name="information-circle-outline"
                    style={{
                      color: props.iconColor,
                      fontSize: props.iconSize
                    }}
                  />
                </AnimatedBorderless>
              )}
            </View>
          </View>
          <Animated.View
            style={[styles().fixedView, { opacity: props.opacity }]}>
            <View style={styles().fixedText}>
              <TextDefault H4 bolder Center textColor={currentTheme.fontWhite}>
                {aboutObject.restaurantName}
              </TextDefault>
              {!props.loading && (
                <View style={styles(currentTheme).deliveryBox}>
                  <TextDefault
                    style={[alignment.PRxSmall, alignment.PLxSmall]}
                    textColor="white"
                    bold>
                    Delivery {aboutObject.deliveryTime} Minute
                  </TextDefault>
                </View>
              )}
              {!props.loading && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles().ratingBox}
                  onPress={() => {
                    navigation.navigate('About', {
                      restaurantObject: { ...aboutObject, isOpen: null },
                      tab: false
                    })
                  }}>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
      {!props.loading && (
        <FlatList
          ref={flatListRef}
          style={styles(currentTheme).flatListStyle}
          contentContainerStyle={{ flexGrow: 1 }}
          data={props.loading ? [] : props.topaBarData}
          horizontal={true}
          ListEmptyComponent={emptyView()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                props.selectedLabel === index
                  ? styles(currentTheme).activeHeader
                  : null,
                { padding: scale(5) }
              ]}>
              <RectButton
                activeOpacity={0.05}
                rippleColor={currentTheme.rippleColor}
                onPress={() => props.changeIndex(index)}
                style={styles(currentTheme).headerContainer}>
                <View style={styles().navbarImageContainer}>
                  <Image
                    source={CATEGORY_IMAGES[item.title]}
                    style={
                      props.selectedLabel === index
                        ? styles(currentTheme).activeImage
                        : styles(currentTheme).inactiveImage
                    }
                    resizeMode="contain"
                  />
                </View>
              </RectButton>
            </View>
          )}
        />
      )}
    </Animated.View>
  )
}

export default React.forwardRef(ImageTextCenterHeader)
