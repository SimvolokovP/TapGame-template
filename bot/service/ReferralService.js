const supabase = require("../config/supabaseConfig");

const ReferralService = {
  async processReferral(referralId, referrerId) {
    console.log(
      `Пользователь с ID ${referralId} присоединился по рефералу пользователя ${referrerId}`
    );

    try {
      const { data: referrerDoc, error: referrerError } = await supabase
        .from("users")
        .select("*")
        .eq("tg_id", referrerId)
        .single();

      if (!referrerDoc) {
        console.log(`Реферер с ID ${referrerId} не существует.`);
        return;
      }

      const { data: referralDoc, error: referralError } = await supabase
        .from("users")
        .select("*")
        .eq("tg_id", referralId)
        .single();

      if (!referralDoc) {
        console.log(
          `Создание нового реферала для пользователя ID ${referralId}`
        );
        const { data: newReferral, error: newReferralError } = await supabase
          .from("users")
          .insert([
            {
              tg_id: referralId,
              referrer_id: referrerId,
              score: 1000,
              isSub: false,
              referrallArray: [],
            },
          ])
          .single();

        if (newReferralError) {
          console.error(
            "Ошибка при создании нового реферала:",
            newReferralError
          );
          return;
        }

        console.log(`Новый реферал создан:`, newReferral);

        const newReferrerScore = referrerDoc.score + 1000;
        const updatedReferrals = [
          ...(referrerDoc.referrallArray || []),
          +referralId,
        ];

        const { error: updateReferrerError } = await supabase
          .from("users")
          .update({
            referrallArray: updatedReferrals,
            score: newReferrerScore,
          })
          .eq("tg_id", referrerId);

        if (updateReferrerError) {
          console.error(
            "Ошибка при обновлении реферера с новым рефералом:",
            updateReferrerError
          );
        } else {
          console.log(
            `Обновлены данные реферера ${referrerId} с новым рефералом ID ${referralId}`
          );
        }
      } else {
        console.log(`Реферал с ID ${referralId} уже существует.`);
      }
    } catch (error) {
      console.error("Ошибка обработки данных реферала:", error);
    }
  },
};

module.exports = ReferralService;
