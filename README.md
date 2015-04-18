# Hydrogen Framework: users' guide
[![Build Status](https://travis-ci.org/raul-arrieta/hydrogen-framework.svg?branch=master)](https://travis-ci.org/raul-arrieta/hydrogen-framework)
[![Coverage Status](https://coveralls.io/repos/raul-arrieta/hydrogen-framework/badge.svg)](https://coveralls.io/r/raul-arrieta/hydrogen-framework)
[![Code Climate](https://codeclimate.com/github/raul-arrieta/hydrogen-framework/badges/gpa.svg)](https://codeclimate.com/github/raul-arrieta/hydrogen-framework)

[![Dependencies](https://david-dm.org/raul-arrieta/hydrogen-framework.svg)](https://david-dm.org/raul-arrieta/hydrogen-framework)

*If you're looking for the* **developers' version** *of the README file, please refer to 
[README for developers](README_developers.md) file*

## Introduction

Hydrogen Framework is a framework primarily focused in supporting simple web application, based on simple navigation and 
data consuming via API resources.

## A web application for Hydrogen Framework

If you asked **Hydrogen** what a web application is, it would answer the following.

A web application is a set of **pages**, each one that can be accessed via one o several **urls**. An application can
also have **sources** for managing data. Those sources can be used throughout all the application, without needing to
redefine them multiple times.

Each **page** is built of **partial views**, which are just a small (or big) piece of HTML code that gets rendered
in a place inside the page. Those partial views can be just that, HTML, or the combination of applying an HTML template
to a set of data, retrieved from a **source**.
 
**Sources** are the way **Hydrogen** manages data. They can be *httpSources* or *localSources*, referring to sources
that get data from an API call or from static sources or local code.

A web application can be (not necessarily, but it is recommended) split in **areas**. This concept allows your 
application to be well-organized through a folder structure that lets you deal with big projects. **ALL** concepts
explained until here apply also to areas, but take this into account: if you *link* a resource, page, partial view,.. to
a single area, it will be accessible only to other resources, pages, partial views... in that area. Instead, defining
resources, pages, partial views,... to the **Application** level, make them accessible through all areas. You should 
find the equilibrium between the two scenarios.

## DISCLOSURE

This framework is a tool for helping developers. The developer that will get helped most is me, as I am learning a lot
about javascript and web development through this project. If it also helps anyone else and allows you to get one single
minute of spare time to enjoy your family and friends, I get absolute compensation.

It is, undoubtedly, not perfect. Use it under your responsibility, and get sure it meets your needs before ever 
starting to develop.

I wouldn't use it in a production environment, but... who am I to tell you what to do?
    
## THANKS   

First, thanks a lot to you, for being interested in this project.

Thanks a lot to [jQuery](https://jquery.com/) developers (all of them). Without you, the web today would not be as 
powerful as it is.

Thanks a lot to [Mustache](https://mustache.github.io/) developers. This framework would have required much more work 
to be developed without your work. Reinventing the wheel is not a good pattern, after all.
  
## Usage

### Required dependencies 

To make use of the current version of **Hydrogen** you also need to include jQuery and Mustache on your website. You
can add those dependencies with **bower**:

    bower install jquery
    bower install mustache
    
### Use guide

First, you should create your **Hydrogen** application, indicating some information about where should it look for
templates, their extension and the base url for building API based calls.

    var BlogApp = new HydrogenApplication('BlogApp',{
    
        templatePath: 'app/templates',
        templateExtension: 'html',
        httpSourceBase: 'http://jsonplaceholder.typicode.com'
    });
    