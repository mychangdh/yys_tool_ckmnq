import { attributeType } from "./Attribute"

//攻击类属性
export const attackAttributeValues : attributeType[] = ['attack', 'attackPercentage', 'critical', 'criticalDamage']
//防御类属性
export const defenseAttributeValues : attributeType[] = ['health', 'healthPercentage', 'defense', 'defensePercentage']
// 功能类属性
export const functionalAttributes : attributeType[] = ['effectHits', 'effectResistant', 'speed']
// 普通属性
export const nomralAttributes : attributeType[] = ['attackPercentage', 'healthPercentage', 'defensePercentage']

