import { attributeType } from "./Attribute"

//攻击类属性
export const attackAttributeValues : attributeType[] = ['attackAdditionVal', 'attackAdditionRate', 'critRateAdditionVal', 'critPowerAdditionVal']
//防御类属性
export const defenseAttributeValues : attributeType[] = ['maxHpAdditionVal', 'maxHpAdditionRate', 'defenseAdditionVal', 'defenseAdditionRate']
// 功能类属性
export const functionalAttributes : attributeType[] = ['debuffEnhance', 'debuffResist', 'speedAdditionVal']
// 普通属性
export const nomralAttributes : attributeType[] = ['attackAdditionRate', 'maxHpAdditionRate', 'defenseAdditionRate']

