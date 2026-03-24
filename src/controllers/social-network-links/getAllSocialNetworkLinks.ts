import { SocialNetworkLinks } from "../../models/social-network-links"
import { KVService } from "../../services/kvService"

export async function getAllSocialNetworkLinks(kvService: KVService): Promise<{ socialNetworkLinks: SocialNetworkLinks[] }> {
  try {
    const keys = await kvService.getAllSocialNetworkLinksKeys()

    const socialNetworkLinksList: SocialNetworkLinks[] = []
    for (const key of keys) {
      const socialNetworkLinksStr = await kvService.getSocialNetworkLinks(key)
      if (socialNetworkLinksStr) {
        const socialNetworkLinks = JSON.parse(socialNetworkLinksStr) as SocialNetworkLinks
        socialNetworkLinksList.push(socialNetworkLinks)
      }
    }

    return { socialNetworkLinks: socialNetworkLinksList }
  } catch (error) {
    throw new Error("Failed to retrieve social network links")
  }
}