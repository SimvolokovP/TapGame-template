import supabase from "../../database/supabase/supabase";
import { IUser } from "../../models/IUser";

export default class UserService {
  static async getById(tg_id: number) {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("tg_id", tg_id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error getting user:", error);
      throw new Error("Failed to get user.");
    }

    return user;
  }

  static async insertNewUser(newUser: IUser) {
    const { data: insertedUser, error } = await supabase
      .from("users")
      .insert([newUser])
      .select("*")
      .single();

    if (error) {
      console.error("Insert Error:", error);
      throw new Error("Failed to insert user.");
    }

    return insertedUser;
  }

  static async logIn(tg_id: number) {
    try {
      let user = await this.getById(tg_id);

      if (!user) {
        const newUser: IUser = {
          tg_id: tg_id,
          energy: 0,
          score: 0,
          isSub: false,
          referrallArray: [],
          created_at: new Date().toISOString(),
        };

        user = await this.insertNewUser(newUser);
      }
      return user;
    } catch (error) {
      console.error("Error in logIn:", error);
      throw new Error("An error occurred during the operation.");
    }
  }

  static async updateScore(tg_id: number, newScore: number, newEnergy: number) {
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({
        score: newScore,
        energy: newEnergy,
      })
      .eq("tg_id", tg_id)
      .select("*")
      .single();

    if (error) {
      console.error("Update Score Error:", error);
      throw new Error("Failed to update score.");
    }

    return updatedUser;
  }

  static async updateSub(tg_id: number, currentScore: number) {
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({
        score: currentScore + 1000,
        isSub: true,
      })
      .eq("tg_id", tg_id)
      .select("*")
      .single();

    if (error) {
      console.error("Update Score Error:", error);
      throw new Error("Failed to update score.");
    }

    return updatedUser;
  }

  static async updateEnergy(tg_id: number, newEnergy: number) {
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({ energy: newEnergy })
      .eq("tg_id", tg_id)
      .select("*")
      .single();

    if (error) {
      console.error("Update Energy Error:", error);
      throw new Error("Failed to update energy.");
    }

    return updatedUser;
  }
}
