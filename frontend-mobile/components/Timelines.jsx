import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { lightTheme } from "../theme/colors";

export default class Timelines extends Component {
  constructor() {
    super();
    this.data = [
      {
        time: "1 Juni",
        title: "Tomat 1",
        description: "Event 1 Description",
        icon: (
          <View
            style={{
              backgroundColor: "white",
              padding: 4,
              borderRadius: 15,
            }}
          >
            <Image
              source={require("../assets/icons8-tomato-48.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
        ),
      },
      {
        time: "2 Juni",
        title: "Citron 2",
        description: "Event 2 Description",
        icon: (
          <View
            style={{
              backgroundColor: "white",
              padding: 4,
              borderRadius: 15,
            }}
          >
            <Image
              source={require("../assets/icons8-citrus-48.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
        ),
      },
      {
        time: "3 Juni",
        title: "Tomat 3",
        description: "Event 3 Description",
        icon: (
          <View
            style={{
              backgroundColor: "white",
              padding: 4,
              borderRadius: 15,
            }}
          >
            <Image
              source={require("../assets/icons8-tomato-48.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
        ),
      },
      {
        time: "4 Juni",
        title: "Citron 4",
        description: "Event 4 Description",
        icon: (
          <View
            style={{
              backgroundColor: "white",
              padding: 4,
              borderRadius: 15,
            }}
          >
            <Image
              source={require("../assets/icons8-citrus-48.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
        ),
      },
      {
        time: "5 Juni",
        title: "Tomat 5",
        description: "Event 5 Description",
        icon: (
          <View
            style={{
              backgroundColor: "white",
              padding: 4,
              borderRadius: 15,
            }}
          >
            <Image
              source={require("../assets/icons8-tomato-48.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
        ),
      },
    ];
  }

  render() {
    return (
      <View style={{ backgroundColor: "#FFFFFF" }}>
        <View style={styles.container}>
          <Timeline
            scrollEnabled={false}
            style={styles.list}
            data={this.data}
            circleSize={30}
            circleColor={lightTheme.secondary}
            circleStyle={{
              border: lightTheme.primary,
              borderWidth: 2,
              padding: 5,
            }}
            lineColor={{ backgroundColor: lightTheme.neutral }}
            timeContainerStyle={{
              minWidth: 80,
              marginTop: 2,
            }}
            timeStyle={{
              textAlign: "center",
              backgroundColor: lightTheme.primary,
              color: "white",
              padding: 5,
              borderRadius: 4,
            }}
            descriptionStyle={{ color: "gray" }}
            options={{
              style: { paddingTop: 5 },
            }}
            innerCircle={"icon"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightTheme.secondary,
    alignItems: "center",
    marginBottom: 60,
  },
  list: {
    width: 250,
  },
});
