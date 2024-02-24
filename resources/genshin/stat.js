import { DisplayModes, Lottery } from '#gc';
import { Base } from '#gc.model';
export const MainStat = {
    FlatHP: new Base.ArrayStat("FlatHP", "生命值", DisplayModes.Integer, [717, 1530, 2342, 3155, 3967, 4780]),
    FlatATK: new Base.ArrayStat("FlatATK", "攻击力", DisplayModes.Integer, [47, 100, 152, 205, 258, 311]),
    HP: new Base.ArrayStat("HP", "生命值", DisplayModes.Percentage1D, [7.0, 14.9, 22.8, 30.8, 38.7, 46.6]),
    ATK: new Base.ArrayStat("ATK", "攻击力", DisplayModes.Percentage1D, [7.0, 14.9, 22.8, 30.8, 38.7, 46.6]),
    DEF: new Base.ArrayStat("DEF", "防御力", DisplayModes.Percentage1D, [8.7, 18.6, 28.6, 38.5, 48.4, 58.3]),
    ElementMastery: new Base.ArrayStat("Elemental Mastery", "元素精通", DisplayModes.Integer, [28, 60, 91, 123, 155, 187]),
    EnergyRecharge: new Base.ArrayStat("Energy Recharge", "元素充能效率", DisplayModes.Percentage1D, [7.8, 16.6, 25.4, 34.2, 43.0, 51.8]),
    ElementalDMGBonus: new Base.ArrayStat("Elemental DMG Bonus", "元素伤害加成", DisplayModes.Percentage1D, [7.0, 14.9, 22.8, 30.8, 38.7, 46.6]), // requires alterName later
    PhysicalDMGBonus: new Base.ArrayStat("Physical DMG Bonus", "物理伤害加成", DisplayModes.Percentage1D, [8.7, 18.6, 28.6, 38.5, 48.4, 58.3]),
    CRITRate: new Base.ArrayStat("CRIT Rate", "暴击率", DisplayModes.Percentage1D, [4.7, 9.9, 15.2, 20.5, 25.8, 31.1]),
    CRITDamage: new Base.ArrayStat("CRIT Damage", "暴击伤害", DisplayModes.Percentage1D, [9.3, 19.9, 30.5, 41.0, 51.6, 62.2]),
    HealingBonus: new Base.ArrayStat("Healing Bonus", "治疗加成", DisplayModes.Percentage1D, [5.4, 11.5, 17.6, 23.7, 29.8, 35.9]),
};
const CRITRate = new Lottery([2.70, 3.11, 3.50, 3.89]);
const CRITDamage = new Lottery([5.44, 6.22, 6.99, 7.77]);
const ATK = new Lottery([4.08, 4.66, 5.25, 5.83]);
const FlatATK = new Lottery([13.62, 15.56, 17.51, 19.45]);
const HP = new Lottery([4.08, 4.66, 5.25, 5.83]);
const FlatHP = new Lottery([209.13, 239, 268.88, 298.75]);
const DEF = new Lottery([5.10, 5.83, 6.56, 7.29]);
const FlatDEF = new Lottery([16.2, 18.52, 20.83, 23.15]);
const ElementalMastery = new Lottery([16.32, 18.65, 20.98, 23.31]);
const EnergyRecharge = new Lottery([4.53, 5.18, 5.83, 6.48]);
export const SubStat = {
    CRITRate: new Base.RandomStat("CRIT Rate", "暴击率", DisplayModes.Percentage1D, CRITRate),
    CRITDamage: new Base.RandomStat("CRIT Damage", "暴击伤害", DisplayModes.Percentage1D, CRITDamage),
    ATK: new Base.RandomStat("ATK", "攻击力", DisplayModes.Percentage1D, ATK),
    FlatATK: new Base.RandomStat("FlatATK", "攻击力", DisplayModes.Integer, FlatATK),
    HP: new Base.RandomStat("HP", "生命值", DisplayModes.Percentage1D, HP),
    FlatHP: new Base.RandomStat("FlatHP", "生命值", DisplayModes.Integer, FlatHP),
    DEF: new Base.RandomStat("DEF", "防御力", DisplayModes.Percentage1D, DEF),
    FlatDEF: new Base.RandomStat("FlatDEF", "防御力", DisplayModes.Integer, FlatDEF),
    ElementalMastery: new Base.RandomStat("Elemental Mastery", "元素精通", DisplayModes.Integer, ElementalMastery),
    EnergyRecharge: new Base.RandomStat("Energy Recharge", "元素充能效率", DisplayModes.Percentage1D, EnergyRecharge),
};
