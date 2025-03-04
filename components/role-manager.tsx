'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Space_Mono } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ChevronDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from 'next/link'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin']
})

interface TokenGatingRule {
  role: string
  roleId: string
  token: string
  chainType: string[]
  minTokens: number
  maxTokens: number
}

interface UserHoldingDetails {
  accounts: string[]
  chains: {
    name: string
    address: string
    balance: string
    token: string[]
  }[]
}

interface SearchResults {
  communityName: string
  communityIcon: string
  communityId: string
  currentPlan: string
  nextBillingDate: string
  lastBalanceCheck: string
  userHoldings: string[]
  tokenGatingRules: TokenGatingRule[]
  userHoldingDetails: UserHoldingDetails
}

interface CommunityInfo {
  communityName: string
  communityIcon: string
  communityId: string
  currentPlan: string
  nextBillingDate: string
  lastBalanceCheck: string
}

export function RoleManager() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [platform, setPlatform] = useState<'discord' | 'telegram'>('discord')
  const [userId, setUserId] = useState('')
  const [communityId, setCommunityId] = useState('')
  const [groupInviteLink, setGroupInviteLink] = useState('')
  const [groupId, setGroupId] = useState('')
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null)
  const [isUserHoldingsOpen, setIsUserHoldingsOpen] = useState(false)
  const [communityInfo, setCommunityInfo] = useState<CommunityInfo | null>(null)

  useEffect(() => {
    // Reset all states when platform changes
    setUserId('')
    setCommunityId('')
    setGroupInviteLink('')
    setGroupId('')
    setSearchResults(null)
    setCommunityInfo(null)
    setIsUserHoldingsOpen(false)

    // Set default values for the selected platform
    if (platform === 'telegram') {
      setUserId('TEL#USER#')
      setCommunityId('TEL#COMM#-')
    }
  }, [platform])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsLogoutDialogOpen(false)
    setPlatform('discord')
    setUserId('')
    setCommunityId('')
    setGroupInviteLink('')
    setGroupId('')
    setSearchResults(null)
    setIsUserHoldingsOpen(false)
  }

  const handleCommunitySearch = () => {
    if (communityId) {
      setCommunityInfo({
        communityName: "OG coin XRPL",
        communityIcon: "/placeholder.svg?height=48&width=48",
        communityId: communityId,
        currentPlan: "Premium",
        nextBillingDate: "June 15, 2024",
        lastBalanceCheck: "May 10, 2024 at 14:30 UTC",
      })
      setSearchResults(null)
    }
  }

  const handleFullSearch = () => {
    if (communityId && userId) {
      setSearchResults({
        communityName: "OG coin XRPL",
        communityIcon: "/placeholder.svg?height=48&width=48",
        communityId: communityId,
        currentPlan: "Premium",
        nextBillingDate: "June 15, 2024",
        lastBalanceCheck: "May 10, 2024 at 14:30 UTC",
        userHoldings: ["XRPL"],
        tokenGatingRules: [
          { 
            role: "Associate", 
            roleId: "130246578516315724", 
            token: "xrpl",
            chainType: ["xrpl/FT:xrp.rHSrt92tKeHoNyxrHsjGpfnbwVCGUzGoGd", "eth/ERC20:0x...", "evm:Arbitrum/ERC20:0xf18C263EC50CC211"],
            minTokens: 1000,
            maxTokens: 9999
          },
          { 
            role: "Consigliere", 
            roleId: "130246733716887957", 
            token: "xrpl",
            chainType: ["xrpl/FT:xrp.rHSrt92tKeHoNyxrHsjGpfnbwVCGUzGoGd", "eth/ERC20:0x...", "evm:Optimism/ERC20:0x8B21e9b7dAF2c432"],
            minTokens: 2000,
            maxTokens: 19999
          },
          { 
            role: "Capo", 
            roleId: "130246648212239578", 
            token: "xrpl",
            chainType: ["xrpl/FT:xrp.rHSrt92tKeHoNyxrHsjGpfnbwVCGUzGoGd"],
            minTokens: 3000,
            maxTokens: 29999
          }
        ],
        userHoldingDetails: {
          accounts: [
            "r3Dx3rLhovqiSLuVxGbyHB15HE67i9KJ4x",
            "rM5ciUrbcpgx62XwzM4hMG2XnuiF2EqX7r",
            "rwvtdWaGhMV7K7gzoXazvM5VQwN6ZZUQFB"
          ],
          chains: [
            {
              name: "xrpl",
              address: "xrpl:mainnet/FT:xrp.rHSrt92tKeHoNyxrHsjGpfnbwVCGUzGoGd",
              balance: "0",
              token: []
            },
            {
              name: "xrpl",
              address: "xrpl:mainnet/FT:xrp.rHSrt92tKeHoNyxrHsjGpfnbwVCGUzGoGd",
              balance: "0",
              token: []
            },
            {
              name: "xrpl",
              address: "xrpl:mainnet/FT:xrp.rHSrt92tKeHoNyxrHsjGpfnbwVCGUzGoGd",
              balance: "0",
              token: []
            }
          ]
        }
      })
      setCommunityInfo(null)
    }
  }

  const handleGetGroupId = () => {
    const mockGroupId = 'TEL#GROUP#-' + Math.random().toString(36).substr(2, 9);
    setGroupId(mockGroupId);
  };

  return (
    <div className="min-h-screen bg-[#1A1A40] flex flex-col">
      <header className="px-4 py-6">
        <nav className="bg-[#F5F1E6] rounded-full px-8 py-6 flex items-center justify-between max-w-7xl mx-auto relative">
          <div className="flex flex-col items-start gap-0">
            <div className="w-24" />
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/color_logo_wordmark-2Pg8pcGf6uxVyIG3c4fFeUeLrxDpEh.png"
              alt="Collab.Land"
              width={600}
              height={120}
              className="h-24 w-auto"
              priority
            />
          </div>
          {isLoggedIn ? (
            <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
              <DialogTrigger asChild>
                <Button className={`bg-[#FFC700] text-[#1A1A40] hover:bg-[#FFD700] hover:text-[#1A1A40] transition-colors ${spaceMono.className} text-base font-bold rounded-full`}>
                  Log out
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-[#2A2A50] text-white border-[#FFC700]">
                <DialogHeader>
                  <DialogTitle className="text-[#FFC700]">Confirm Logout</DialogTitle>
                  <DialogDescription className="text-zinc-300">
                    Are you sure you want to log out?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button 
                    variant="ghost"
                    onClick={() => setIsLogoutDialogOpen(false)} 
                    className="bg-[#8C92AC] text-white hover:bg-[#9CA2BC] hover:text-white transition-colors"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleLogout} className="bg-[#FFC700] text-[#1A1A40] hover:bg-[#FFD700]">
                    Log out
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Button 
              onClick={handleLogin}
              className={`bg-[#FFC700] text-[#1A1A40] hover:bg-[#FFD700] hover:text-[#1A1A40] transition-colors ${spaceMono.className} text-base font-bold rounded-full`}
            >
              Log in
            </Button>
          )}
        </nav>
      </header>
      {!isLoggedIn && (
        <div 
          className="w-full h-[1000px] bg-[url('/ACEs.svg')] bg-[length:1600px_auto] bg-right-bottom bg-no-repeat -mt-48"
        />
      )}
      {isLoggedIn && (
        <main className="p-6 flex-1">
          <div className="max-w-[90rem] mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#FFC700]">Role Manager</h1>
              <p className="text-sm text-zinc-300">Collab.Land internal support tool</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Label htmlFor="platform-toggle" className="text-zinc-300">Discord</Label>
                <Switch
                  id="platform-toggle"
                  checked={platform === 'telegram'}
                  onCheckedChange={(checked) => setPlatform(checked ? 'telegram' : 'discord')}
                  className="data-[state=checked]:bg-[#FFC700]"
                />
                <Label htmlFor="platform-toggle" className="text-zinc-300">Telegram</Label>
              </div>

              {platform === 'telegram' && (
                <div className="w-full space-y-2 mb-4">
                  <label htmlFor="groupInviteLink" className="text-sm text-zinc-300">Group Invite Link</label>
                  <div className="flex gap-2">
                    <Input 
                      id="groupInviteLink" 
                      value={groupInviteLink}
                      onChange={(e) => setGroupInviteLink(e.target.value)}
                      placeholder="https://t.me/joinchat/..."
                      className="bg-[#2A2A50] border-zinc-600 text-white rounded-full w-full md:w-4/5" 
                    />
                    <Button 
                      onClick={handleGetGroupId}
                      className="bg-[#FFC700] hover:bg-[#FFD700] text-[#1A1A40] font-bold whitespace-nowrap rounded-full"
                    >
                      Get Group ID
                    </Button>
                  </div>
                  {groupId && (
                    <Alert className="mt-2 bg-[#2A2A50] border-[#FFC700] text-white">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Group ID Retrieved</AlertTitle>
                      <AlertDescription>{groupId}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              <div className="w-full space-y-2 mb-4">
                <label htmlFor="communityId" className="text-sm text-zinc-300">Community ID</label>
                <div className="flex gap-2">
                  <Input 
                    id="communityId" 
                    value={communityId}
                    onChange={(e) => setCommunityId(e.target.value)}
                    className="bg-[#2A2A50] border-zinc-600 text-white rounded-full w-full md:w-4/5" 
                  />
                  <Button 
                    onClick={handleCommunitySearch}
                    className="bg-[#FFC700] hover:bg-[#FFD700] text-[#1A1A40] font-bold whitespace-nowrap rounded-full"
                  >
                    Community Info
                  </Button>
                </div>
              </div>

              <div className="w-full space-y-2">
                <label htmlFor="userId" className="text-sm text-zinc-300">User ID</label>
                <div className="flex gap-2">
                  <Input 
                    id="userId" 
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="bg-[#2A2A50] border-zinc-600 text-white rounded-full w-full md:w-4/5" 
                  />
                  <Button 
                    onClick={handleFullSearch}
                    className="bg-[#FFC700] hover:bg-[#FFD700] text-[#1A1A40] font-bold whitespace-nowrap rounded-full"
                  >
                    Search Roles
                  </Button>
                  <Button variant="secondary" className="bg-[#2A2A50] hover:bg-[#3A3A60] text-white whitespace-nowrap rounded-full">
                    Resolve All
                  </Button>
                </div>
              </div>

              {(communityInfo || searchResults) && (
                <div className="space-y-6">
                  <div className="p-4 bg-[#2A2A50] rounded-2xl">
                    {communityInfo && (
                      <>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-[#2A2A50] rounded-full flex items-center justify-center text-2xl">
                            🪙
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-[#FFC700]">{communityInfo.communityName}</h2>
                            <p className="text-sm text-zinc-300">{communityInfo.communityId}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-zinc-300">Current Plan:</p>
                            <p className="text-white font-medium">{communityInfo.currentPlan}</p>
                          </div>
                          <div>
                            <p className="text-sm text-zinc-300">Next Billing Date:</p>
                            <p className="text-white font-medium">{communityInfo.nextBillingDate}</p>
                          </div>
                        </div>
                      </>
                    )}
                    {searchResults && (
                      <>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-[#2A2A50] rounded-full flex items-center justify-center text-2xl">
                            🪙
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-[#FFC700]">{searchResults.communityName}</h2>
                            <p className="text-sm text-zinc-300">{searchResults.communityId}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-zinc-300">Current Plan:</p>
                            <p className="text-white font-medium">{searchResults.currentPlan}</p>
                          </div>
                          <div>
                            <p className="text-sm text-zinc-300">Next Billing Date:</p>
                            <p className="text-white font-medium">{searchResults.nextBillingDate}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-4 bg-[#2A2A50] rounded-2xl">
                    <h2 className="text-lg font-semibold text-[#FFC700] mb-2">Balance Check</h2>
                    <div>
                      <p className="text-sm text-zinc-300">Last Balance Check:</p>
                      <p className="text-white font-medium">{communityInfo ? communityInfo.lastBalanceCheck : searchResults?.lastBalanceCheck}</p>
                    </div>
                  </div>

                  {searchResults && (
                    <>
                      <Collapsible
                        open={isUserHoldingsOpen}
                        onOpenChange={setIsUserHoldingsOpen}
                        className="p-4 bg-[#2A2A50] rounded-2xl"
                      >
                        <CollapsibleTrigger asChild>
                          <div className="flex items-center justify-between cursor-pointer">
                            <h2 className="text-lg font-semibold text-[#FFC700]">User Holdings</h2>
                            <ChevronDown className={`w-4 h-4 text-[#FFC700] transition-transform duration-200 ${isUserHoldingsOpen ? 'transform rotate-180' : ''}`} />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-4 mt-4">
                          <div>
                            <h3 className="text-[#FFC700] text-sm font-medium mb-2">Accounts:</h3>
                            <div className="space-y-2">
                              {searchResults.userHoldingDetails.accounts.map((account, index) => (
                                <div key={index} className="text-sm text-zinc-300 break-all">
                                  {account}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-4">
                            {searchResults.userHoldingDetails.chains.map((chain, index) => (
                              <div key={index} className="p-3 bg-[#1A1A40] rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="px-2 py-1 bg-[#2A2A50] text-white rounded-full text-xs uppercase">
                                    {chain.name}
                                  </span>
                                </div>
                                <div className="space-y-1 text-sm">
                                  <p className="text-zinc-300 break-all">{chain.address}</p>
                                  <p className="text-zinc-300">Balance: {chain.balance}</p>
                                  <p className="text-zinc-300">
                                    Token: {chain.token.length ? chain.token.join(', ') : '[]'}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      <div className="p-4 bg-[#2A2A50] rounded-2xl">
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-semibold text-[#FFC700]">
                            {platform === 'telegram' ? 'Token Gating Access' : 'Token Gating Rules'}
                          </h2>
                          <ChevronDown className="w-4 h-4 text-[#FFC700]" />
                        </div>
                        <div className="mt-4 space-y-2">
                          {searchResults.tokenGatingRules.map((rule, index) => (
                            <Collapsible key={index}>
                              <CollapsibleTrigger className="w-full">
                                <div className="flex items-center justify-between p-4 bg-[#1A1A40] rounded-lg hover:bg-[#1A1A40]/80 cursor-pointer relative">
                                  <div className={`absolute left-0 top-0 bottom-0 w-3 ${index === 0 ? 'bg-[#3A7D7B]' : 'bg-[#E94B3C]'} rounded-l-lg`} />
                                  <div>
                                    <p className="text-white font-medium">
                                      {platform === 'telegram' ? `Access ${index + 1}` : rule.role}
                                    </p>
                                    <p className="text-sm text-zinc-300">{rule.roleId}</p>
                                  </div>
                                  <span className="px-3 py-1 bg-[#2A2A50] text-white rounded-full text-sm uppercase">
                                    {rule.token}
                                  </span>
                                </div>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="p-3 mt-1 bg-[#1A1A40] rounded-lg space-y-2">
                                <div className={`grid ${platform === 'telegram' ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-3`}>
                                  {rule.chainType.slice(0, 3).map((chain, chainIndex, array) => (
                                    <div key={chainIndex} className="flex flex-col gap-3">
                                      {platform === 'telegram' ? (
                                        chainIndex === 0 || chainIndex % 2 === 0 ? (
                                          <div className="p-4 bg-[#2A2A50] rounded-xl space-y-3 border border-[#FFC700]">
                                            <div className="space-y-3">
                                              <div className="p-3 bg-[#1A1A40] rounded-lg">
                                                <div>
                                                  <p className="text-[#FFC700] text-sm mb-2">Chain / token type</p>
                                                  <p className="text-zinc-200 text-sm font-mono break-all">{chain.trim()}</p>
                                                </div>
                                                <div className="mt-3">
                                                  <p className="text-[#FFC700] text-sm mb-1">Min / max tokens:</p>
                                                  <p className="text-zinc-200 text-sm font-mono">
                                                    {rule.minTokens}
                                                    {rule.maxTokens === Infinity ? ' ∞' : `/ ${rule.maxTokens}`}
                                                  </p>
                                                </div>
                                              </div>
                                              
                                              {chainIndex + 1 < array.length && chainIndex % 2 === 0 && (
                                                <>
                                                  <div className="flex items-center justify-center my-2">
                                                    <span className="text-[#FFC700] font-bold">AND</span>
                                                  </div>
                                                  <div className="p-3 bg-[#1A1A40] rounded-lg">
                                                    <div>
                                                      <p className="text-[#FFC700] text-sm mb-2">Chain / token type</p>
                                                      <p className="text-zinc-200 text-sm font-mono break-all">{array[chainIndex + 1].trim()}</p>
                                                    </div>
                                                    <div className="mt-3">
                                                      <p className="text-[#FFC700] text-sm mb-1">Min / max tokens:</p>
                                                      <p className="text-zinc-200 text-sm font-mono">
                                                        {rule.minTokens}
                                                        {rule.maxTokens === Infinity ? ' ∞' : `/ ${rule.maxTokens}`}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        ) : null
                                      ) : (
                                        <div className="p-4 bg-[#2A2A50] rounded-xl space-y-3 border border-[#FFC700]">
                                          <div className="p-3 bg-[#1A1A40] rounded-lg">
                                            <div>
                                              <p className="text-[#FFC700] text-sm mb-2">Chain / token type</p>
                                              <p className="text-zinc-200 text-sm font-mono break-all">{chain.trim()}</p>
                                            </div>
                                            <div className="mt-3">
                                              <p className="text-[#FFC700] text-sm mb-1">Min / max tokens:</p>
                                              <p className="text-zinc-200 text-sm font-mono">
                                                {rule.minTokens}
                                                {rule.maxTokens === Infinity ? ' ∞' : `/ ${rule.maxTokens}`}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <style jsx global>{`
            .switch[data-state="checked"] {
              background-color: #FFC700 !important;
            }
          `}</style>
        </main>
      )}

<footer className="bg-[#FFC700] py-2">
        <div className="w-full px-4">
          <div className="flex flex-row justify-between items-center max-w-[1920px] mx-auto">
            <nav className="flex space-x-4">
              <Link 
                href="https://www.collab.land/privacy-policy" 
                className={`text-sm font-bold text-[#1A1A40] hover:text-[#1A1A40]/80 ${spaceMono.className}`}
              >
                Privacy Policy
              </Link>
              <Link 
                href="https://www.collab.land/terms-of-service" 
                className={`text-sm font-bold text-[#1A1A40] hover:text-[#1A1A40]/80 ${spaceMono.className}`}
              >
                Terms
              </Link>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Link href="https://linktr.ee/collab_land_" target="_blank">
                <Button size="icon" variant="ghost" className="h-8 w-8 p-1 hover:bg-transparent group">
                  <Image 
                    src="/LinktreeIcon.svg" 
                    alt="Linktree" 
                    width={20} 
                    height={20} 
                    className="transition-all duration-200 group-hover:scale-110 group-hover:brightness-75"
                  />
                </Button>
              </Link>
              <Link href="https://discord.gg/collabland" target="_blank">
                <Button size="icon" variant="ghost" className="h-8 w-8 p-1 hover:bg-transparent group">
                  <Image 
                    src="/DiscordIcon.svg" 
                    alt="Discord" 
                    width={20} 
                    height={20}
                    className="transition-all duration-200 group-hover:scale-110 group-hover:brightness-75" 
                  />
                </Button>
              </Link>
              <Link href="https://x.com/collab_land_" target="_blank">
                <Button size="icon" variant="ghost" className="h-8 w-8 p-1 hover:bg-transparent group">
                  <Image 
                    src="/XIcon.svg" 
                    alt="X (formerly Twitter)" 
                    width={20} 
                    height={20}
                    className="transition-all duration-200 group-hover:scale-110 group-hover:brightness-75"
                  />
                </Button>
              </Link>
            </div>

            <p className={`text-sm font-bold flex items-center gap-1.5 text-[#1A1A40] ${spaceMono.className}`}>
              <Image 
                src="/LogoIcon.svg" 
                alt="Collab.Land Logo" 
                width={18} 
                height={18} 
                className="inline-block"
              />
              Collab.Land® 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}