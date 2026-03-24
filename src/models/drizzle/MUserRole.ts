import { eq } from "drizzle-orm"
import { user_roles } from "../../db/schema"
import DrizzleModel from "./DrizzleModel"
class MUserRole extends DrizzleModel {
  schema = user_roles

  getRowByUserId(userId: number) {
    return this.db
      .select()
      .from(this.schema)
      .where(eq(this.schema.userId, userId))
      .get(0)
  }
}
export default MUserRole
