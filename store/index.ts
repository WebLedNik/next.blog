import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import {rootReducer} from "./reducers";

import lifeIcon from "../public/images/categories/life.webp";
import bgDesign from "../public/images/categories/bg-design.webp";
import marketingIcon from "../public/images/categories/marketing.webp";
import bgMarketing from "../public/images/categories/bg-marketing.webp";
import foodIcon from "../public/images/categories/food.webp";
import futureIcon from "../public/images/categories/future.webp";
import designIcon from "../public/images/categories/design.webp";
import techIcon from "../public/images/categories/tech.webp";
import hrIcon from "../public/images/categories/hr.webp";


export const iconsCategory = [
    {category_slug: "life", src: lifeIcon, bg: bgDesign},
    {category_slug: "marketing", src: marketingIcon, bg: bgMarketing},
    {category_slug: "food", src: foodIcon, bg: bgDesign},
    {category_slug: "future", src: futureIcon, bg: bgDesign},
    {category_slug: "design", src: designIcon, bg: bgDesign},
    {category_slug: "tech", src: techIcon, bg: bgDesign},
    {category_slug: "hr", src: hrIcon, bg: bgDesign},
]

export const api = 'https://api.weblednik.ru/api'

export const store = createStore(rootReducer, composeWithDevTools())
