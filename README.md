# Plane Tracker

This application is composed of two parts. The first part is a process which gathers data from [Flight Aware's dump1090](https://github.com/flightaware/dump1090) and saves messages from airplanes to a Postgresql database. These messages are comprised of an airplanes geological position, altitude, speed, and other information.

The second part of the application is a NextJS/React web app that visualizes the data by showing planes and tracing their path on a map.
