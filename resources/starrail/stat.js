import { DisplayModes, Lottery } from '#gc';
import { StarRail } from '#gc.model';
const DMGBoost = new StarRail.ConstantStat("DMG Boost", "属性伤害提高", DisplayModes.Percentage1D, 6.2208, 2.1773 * 3);
export const MainStat = {
    FlatHP: new StarRail.ConstantStat("FlatHP", "生命值", DisplayModes.Integer, 112.896, 39.5136 * 3),
    FlatATK: new StarRail.ConstantStat("FlatATK", "攻击力", DisplayModes.Integer, 56.448, 19.7568 * 3),
    HP: new StarRail.ConstantStat("HP", "生命值", DisplayModes.Percentage1D, 6.9120, 2.4192 * 3),
    ATK: new StarRail.ConstantStat("ATK", "攻击力", DisplayModes.Percentage1D, 6.9120, 2.4192 * 3),
    DEF: new StarRail.ConstantStat("DEF", "防御力", DisplayModes.Percentage1D, 8.64, 3.024 * 3),
    SPD: new StarRail.ConstantStat("SPD", "速度", DisplayModes.Integer, 4.032, 1.4 * 3),
    BreakEffect: new StarRail.ConstantStat("Break Effect", "击破特攻", DisplayModes.Percentage1D, 10.368, 3.6277 * 3),
    EffectHitRate: new StarRail.ConstantStat("Effect Hit Rate", "效果命中", DisplayModes.Percentage1D, 6.912, 2.4192 * 3),
    EnergyRegenerationRate: new StarRail.ConstantStat("Energy Regeneration Rate", "能量恢复效率", DisplayModes.Percentage1D, 3.1104, 1.0886 * 3),
    OutgoingHealingBoost: new StarRail.ConstantStat("Outgoing Healing Boost", "治疗量加成", DisplayModes.Percentage1D, 5.5296, 1.9354 * 3),
    CRITRate: new StarRail.ConstantStat("CRIT Rate", "暴击率", DisplayModes.Percentage1D, 5.184, 1.8144 * 3),
    CRITDMG: new StarRail.ConstantStat("CRIT DMG", "暴击伤害", DisplayModes.Percentage1D, 10.368, 3.6288 * 3),
    PhysicalDMGBoost: DMGBoost.alterName("Physical DMG Boost", "物理属性伤害提高"),
    FireDMGBoost: DMGBoost.alterName("Fire DMG Boost", "火属性伤害提高"),
    IceDMGBoost: DMGBoost.alterName("Ice DMG Boost", "冰属性伤害提高"),
    WindDMGBoost: DMGBoost.alterName("Wind DMG Boost", "风属性伤害提高"),
    LightningDMGBoost: DMGBoost.alterName("Lightning DMG Boost", "雷属性伤害提高"),
    QuantumDMGBoost: DMGBoost.alterName("Quantum DMG Boost", "量子属性伤害提高"),
    ImaginaryDMGBoost: DMGBoost.alterName("Imaginary DMG Boost", "虚数属性伤害提高"),
};
const SPD = new Lottery([2, 2.3, 2.6]);
const FlatHP = new Lottery([33.87, 38.103755, 42.33751]);
const FlatATK = new Lottery([16.935, 19.051877, 21.168754]);
const FlatDEF = new Lottery([16.935, 19.051877, 21.168754]);
const HP = new Lottery([3.456, 3.888, 4.32]);
const ATK = new Lottery([3.456, 3.888, 4.32]);
const DEF = new Lottery([4.32, 4.86, 5.4]);
const BreakEffect = new Lottery([5.184, 5.832, 6.48]);
const EffectHitRate = new Lottery([3.456, 3.888, 4.32]);
const EffectRES = new Lottery([3.456, 3.888, 4.32]);
const CRITRate = new Lottery([2.592, 2.916, 3.24]);
const CRITDMG = new Lottery([5.184, 5.832, 6.48]);
export const SubStat = {
    SPD: new StarRail.RandomStat("SPD", "速度", DisplayModes.Integer, SPD),
    FlatHP: new StarRail.RandomStat("FlatHP", "生命值", DisplayModes.Integer, FlatHP),
    FlatATK: new StarRail.RandomStat("FlatATK", "攻击力", DisplayModes.Integer, FlatATK),
    FlatDEF: new StarRail.RandomStat("FlatDEF", "防御力", DisplayModes.Integer, FlatDEF),
    HP: new StarRail.RandomStat("HP", "生命值", DisplayModes.Percentage1D, HP),
    ATK: new StarRail.RandomStat("ATK", "攻击力", DisplayModes.Percentage1D, ATK),
    DEF: new StarRail.RandomStat("DEF", "防御力", DisplayModes.Percentage1D, DEF),
    BreakEffect: new StarRail.RandomStat("Break Effect", "击破特攻", DisplayModes.Percentage1D, BreakEffect),
    EffectHitRate: new StarRail.RandomStat("Effect Hit Rate", "效果命中", DisplayModes.Percentage1D, EffectHitRate),
    EffectRES: new StarRail.RandomStat("Effect RES", "效果抵抗", DisplayModes.Percentage1D, EffectRES),
    CRITRate: new StarRail.RandomStat("CRIT Rate", "暴击率", DisplayModes.Percentage1D, CRITRate),
    CRITDMG: new StarRail.RandomStat("CRIT DMG", "暴击伤害", DisplayModes.Percentage1D, CRITDMG),
};
